$(document).ready(function () {

    const mapStrength = [
        {
            text: '',
            bars: 0,
            color: "#18171F"
        },
        {
            text: 'TOO WEAK!',
            bars: 1,
            color: "#F64A4A"
        },
        {
            text: 'WEAK',
            bars: 2,
            color: "#FB7C58"
        },
        {
            text: 'MEDIUM',
            bars: 3,
            color: "#F8CD65"
        },
        {
            text: 'STRONG',
            bars: 4,
            color: "#A4FFAF"
        },

    ]
    const mapPasswordType = {
        "Include Uppercase Letters": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "Include Lowercase Letters": "abcdefghijklmnopqrstuvwxyz",
        "Include Numbers": "0123456789",
        "Include Symbols": "!@#$%^&*()_+[]{}|;:,.<>?"
    }
    let checkedItems = []
    const checkStrength = (checkedItems) => {
        const lengthCheckedItems = checkedItems.length
        return mapStrength[lengthCheckedItems]
    }

    const generatePassword = (checkedItems, length) => {
        const characters = checkedItems.reduce((acc, item) => {
            return acc + mapPasswordType[item];
        }, '');


        let password = "";

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }

        return password;
    };


    $("img").on('click', (e) => {
        const value = $("#password").text();
        console.log(value)
        navigator.clipboard.writeText(value).then(function () {
            console.log("Texto copiado com sucesso");
            $("#copied").removeClass('hide')
            setTimeout(() => {

                $("#copied").addClass('hide');
            }, 2000)
        }).catch(function (err) {
            alert('Erro ao copiar o texto: ', err);
        });
    })
    $("#main-btn").click(function () {
        if (checkedItems.length === 0) {
            return
        }
        const length = $(".character-length-container p").last().text()
        const password = generatePassword(checkedItems, length)

        $("#password").text(password).css('color', '#E6E5EA')

    });
    $("i").click(function () {

        if ($(this).hasClass("fa-solid")) {
            $(this).removeClass("fa-solid fa-square-check fa-xl")
            $(this).addClass("fa-regular fa-square fa-xl")
            const nextValue = $(this).next().text()

            checkedItems = checkedItems.filter((item) => item !== nextValue)
            const status = checkStrength(checkedItems)
            $(".strength-status p").text(status.text)
            $(".bars-status div").slice(0, status.bars).css('background-color', `${status.color}`)
            $(".bars-status div").slice(status.bars, 4).css('background-color', '#18171F')





        }
        else {
            $(this).removeClass("fa-regular fa-square fa-xl")
            $(this).addClass("fa-solid fa-square-check fa-xl")
            const nextValue = $(this).next().text()
            checkedItems.push(nextValue)
            const status = checkStrength(checkedItems)
            $(".strength-status p").text(status.text)
            $(".bars-status div").slice(0, status.bars).css('background-color', `${status.color}`)
            $(".bars-status div").slice(status.bars, 4).css('background-color', '#18171F')
        }

    });

    $("input[type='range']").on('input', function (e) {
        const rangeValue = e.target.value;
        const valPercent = (rangeValue / 20) * 100; // Get the percentage of the value

        // Update the text of the last paragraph
        $(".character-length-container p").last().text(rangeValue);

        // Dynamically change the background of the range input (track)
        $("input[type='range']").css('background', `linear-gradient(to right, #A4FFAF ${valPercent}%, #18171F ${valPercent}%)`);
    });


})        