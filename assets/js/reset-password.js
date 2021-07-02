let otpForm = $('#otp-form')
let message = $('#message')
let otpInput = $('#otp-input')
let otpEmail = $('#otp-email')
let otpBtn = $('#otp-btn')

otpForm.on('submit', function (e) {
    if( $(this).attr('class')=='change-password'){
        return//no need to make ajax call for to change-password as it will be done by form action and method
     }
    e.preventDefault()//stoping form's default behaviour to make a get/post request so that we can make ajax request
    //ajax request which can handle 2 types of request one to send otp and other to verify otp as per requirement
    $.ajax({
        type: 'post',
        url: otpForm.prop('action'),//url grabed from form action attribute
        data: $(this).serialize(),//url encoded form data
        success: (data) => {
            // console.log(data)
            if (otpForm.attr('class') == 'send-otp') {//handle response send-otp
                message.html(`
                    <div class="alert alert-warning alert-dismissible fade show p-1 my-2" role="alert">
                        ${data.message}
                        <button type="button" class="btn-close p-0 pe-2 my-auto" data-bs-dismiss="alert" aria-label="Close" style="height: 100%;"></button>
                    </div>`)
                if (data.status == 1) {
                    otpEmail.prop('readonly', true)
                    otpInput.html(`
                    <div class="mb-3">
                        <label for="otp" class="form-label">Enter OTP</label>
                        <input autocomplete="off" type="password" class="form-control" id="otp" aria-describedby="emailHelp" name="otp" required>
                    </div>`)
                    otpBtn.text('Verify OTP')
                    $(this).attr('action', '/reset-password/verify-otp')
                    $(this).attr('class', 'verify-otp')
                }
            }
            else if (otpForm.attr('class') == 'verify-otp') {//handle response of verify-otp
                message.html(`
                    <div class="alert alert-warning alert-dismissible fade show p-1 my-2" role="alert">
                        ${data.message}
                        <button type="button" class="btn-close p-0 pe-2 my-auto" data-bs-dismiss="alert" aria-label="Close" style="height: 100%;"></button>
                    </div>`)
                if (data.status == 1) {
                    otpInput.html(`
                    <div class="mb-3">
                        <label for="new-password" class="form-label">New Password</label>
                        <input autocomplete="off" type="password" class="form-control" id="new-password" aria-describedby="emailHelp" name="newPassword" required>
                    </div>
                    <div class="mb-3">
                        <label for="confirm-password" class="form-label">Confirm Password</label>
                        <input autocomplete="off" type="password" class="form-control" id="confirm-password" aria-describedby="emailHelp" name="confirmPassword" required>
                    </div>
                    `)
                    otpBtn.text('Change Password!')
                    $(this).attr('action', '/reset-password/change-password')
                    $(this).attr('class', 'change-password')

                    document.cookie=`token=${data.token}`//storing jwt token as cookie
                }
               
            }
        },
        error: (err) => {
            console.log(err.responseText)
        }
    })
})