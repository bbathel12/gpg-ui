let success = (value) => {
    console.log("Copied: "+value)
}
let failure = (value) => {
    console.log("Failed: "+value)
}

$(document).ready(()=>{

    document.querySelector('.copy').addEventListener('click',(e)=>{
        e.preventDefault()
        let $this = $(e.target);
        $this.focus()
        let copyTarget = document.querySelector($this.data('target'))
        navigator.clipboard.writeText(copyTarget.value)
            .then(
                (success,failure)
            );
    })
})
