let success = (value) => {
    console.log("Copied: " + value)
}
let failure = (value) => {
    console.log("Failed: " + value)
}

$(document).ready(() => {

    let copy = document.querySelector('#message_copy')

    document.querySelector('#message').addEventListener('keyup', (e) => {
        copy.value = e.target.value
    })

    document.querySelector('.copy').addEventListener('click', (e) => {
        e.preventDefault()
        copy.select();
        copy.setSelectionRange(0, 9999999);
        navigator.clipboard.writeText(copy.value)
            .then(
                (success, failure)
            );
    })
})
