const {spawnSync} = require('child_process')
const fs = require('fs')

let handleMessage = (req,res,next) => {
    let exec_command = "gpg";
    let exec_params = [];
    let filename ="";
    let errors = []

    console.log(req.body,req.body.decrypt == undefined);

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
        console.log(exec_command,exec_params)
        const output = spawnSync(exec_command,exec_params);
        console.log(output.stderr.toString());
        console.log(output.stdout.toString());
        if(req.body.encrypt !== undefined){
            let message = fs.readFileSync(filename+".asc").toString()
            res.render('index.jade',{errors,message});
        }else{
            res.render('index.jade',{errors,message: output.stdout});
        }

    }catch(e){
        console.log(typeof e)
        console.log(e.code)

        if(e.code === 'ENOENT' && req.body.encrypt !== undefined){
            errors.push("No Recipients Chosen");
        }
        res.render('index.jade',{errors,message:""});
    }
}

module.exports = {
    handleMessage
}