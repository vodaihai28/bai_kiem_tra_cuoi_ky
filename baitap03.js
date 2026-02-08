
       let target = Math.floor(Math.random() * 100) + 1;
        let attempts = 0;

        function checkGuess() {
            let val = parseInt(document.getElementById('guess').value);
            let msg = document.getElementById('msg');
            attempts++;
            document.getElementById('count').innerText = attempts;

            if (val === target) {
                msg.innerHTML = "<b>Chính xác!</b>";
                document.getElementById('win-effect').style.display = 'block';
            } else if (val > target) {
                msg.innerText = "Quá cao!";
            } else {
                msg.innerText = "Quá thấp!";
            }
        }
    