(function () {
    const correctAnswer = "4CB2F";
    const inputs = document.querySelectorAll('#otp > *[id]');

    function checkAnswer() {
        let isValid = true;
        let allFilledIn = true;
        for (let inputIndex = 0; inputIndex < inputs.length; inputIndex++) {
            if (inputs[inputIndex].value === "") {
                allFilledIn = false;
            }
            if (correctAnswer[inputIndex] !== inputs[inputIndex].value) {
                isValid = false;
            }
        }
        if (allFilledIn) {
            const classToAdd = isValid ? "valid" : "invalid";
            const classToRemove = isValid ? "invalid" : "valid";
            for (let inputIndex = 0; inputIndex < inputs.length; inputIndex++) {
                inputs[inputIndex].classList.add(classToAdd);
                inputs[inputIndex].classList.remove(classToRemove);
            }
            setTimeout(() => {
                for (let inputIndex = 0; inputIndex < inputs.length; inputIndex++) {
                    inputs[inputIndex].classList.remove(classToAdd);
                }
            },2000)
        } else {
            for (let inputIndex = 0; inputIndex < inputs.length; inputIndex++) {
                inputs[inputIndex].classList.remove("valid");
                inputs[inputIndex].classList.remove("invalid");
            }
        }
    }

    function OTPInput() {
        // Not the cleanest code but ¯\_(ツ)_/¯, it's just a one time use thing
        // https://stackoverflow.com/a/64272833
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener('keydown', function (event) {
                if (event.key === "Backspace") {
                    inputs[i].value = '';
                    if (i !== 0)
                        inputs[i - 1].focus();
                } else {
                    if (i === inputs.length - 1 && inputs[i].value !== '') {
                        return true;
                    } else if (event.keyCode > 47 && event.keyCode < 58) {
                        inputs[i].value = event.key;
                        if (i !== inputs.length - 1)
                            inputs[i + 1].focus();
                        event.preventDefault();
                    } else if (event.keyCode > 64 && event.keyCode < 91) {
                        inputs[i].value = String.fromCharCode(event.keyCode);
                        if (i !== inputs.length - 1)
                            inputs[i + 1].focus();
                        event.preventDefault();
                    }

                    // Something was entered, check if answer is correct
                    checkAnswer();
                }
            });
        }
    }

    OTPInput();
})()