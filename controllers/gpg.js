const {spawnSync} = require('child_process')
const fs = require('fs')

let handleMessage = (req,res,next) => {
    let exec_command = "gpg";
    let exec_params = [];
    let filename ="";
    let errors = []

    if(req.body.passphrase != undefined){
        exec_params.push( "--passphrase="+req.body.passphrase)
    }

    if(req.body.decrypt != undefined){
        exec_params.push( "--decrypt")
    }else if(req.body.encrypt != undefined){
        exec_params.push( "-e")
        exec_params.push("--armor")
    }

    if(req.body.recipient != undefined){
        exec_params.push('-r')
        exec_params.push(req.body.recipient)
    }

    if(req.body.message != undefined){
        filename = '/tmp/tempgpg'+Date.now()+'.txt';
        let fd = fs.openSync(filename,'w')
        fs.writeSync(fd,req.body.message)
        exec_params.push(filename)
    }

    try{
        const output = spawnSync(exec_command,exec_params);
        if(req.body.encrypt !== undefined){
            let message = fs.readFileSync(filename+".asc").toString()
            res.render('index',{errors,message});
        }else{
            res.render('index',{errors,message: output.stdout});
        }
    }catch(e){
        if(e.code === 'ENOENT' && req.body.encrypt !== undefined && req.body.recipient === undefined){
            errors.push("No Recipients Chosen");
        }
        if(e.code === 'ENOENT' && req.body.encrypt !== undefined && req.body.recipient !== undefined){
            errors.push("Chosen Recipient Doesn't exist");
        }
        res.render('index',{errors,message:""});
    }
}

let addKey = (req,res,next) => {
    let exec_command = "gpg";
    let exec_params = [];
    let filename ="";
    let errors = []
    let alerts = [];

    if(req.body.key !== undefined){
        filename = '/tmp/tempgpg'+Date.now()+'.txt';
        let fd = fs.openSync(filename,'w')
        fs.writeSync(fd,req.body.key)
        exec_params.push('--import')
        exec_params.push(filename)
    }
    const output = spawnSync(exec_command,exec_params);
    console.log("STDOUT",output.stdout.toString())
    console.log("STDERR",output.stderr.toString())

    if(/no valid OpenPGP/mg.test(output.stderr.toString())){
        errors.push("Key not valid")
    }else if(/unchanged: 1/mg.test(output.stderr.toString())){
        errors.push("Key already exists")
    }else{
        alerts.push("Key Added")
    }

    res.render('add-keys',{alerts,errors})
}

module.exports = {
    handleMessage,
    addKey
}