let otpForm = $('#otp-form')
let message = $('#message')
let otpInput = $('#otp-input')
let otpEmail = $('#otp-email')
let otpBtn = $('#otp-btn')

otpForm.on('submit', function (e) {
    if( $(this).attr('class')=='change-password'){
        return
     }
    e.preventDefault()
    $.ajax({
        type: 'post',
        url: otpForm.prop('action'),
        data: $(this).serialize(),
        success: (data) => {
            // console.log(data)
            if (otpForm.attr('class') == 'send-otp') {//if form is currently used for sending otp
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
                        <input type="password" class="form-control" id="otp" aria-describedby="emailHelp" name="otp" required>
                    </div>`)
                    otpBtn.text('Verify OTP')
                    $(this).attr('action', '/reset-password/verify-otp')
                    $(this).attr('class', 'verify-otp')
                }
            }
            else if (otpForm.attr('class') == 'verify-otp') {
                message.html(`
                    <div class="alert alert-warning alert-dismissible fade show p-1 my-2" role="alert">
                        ${data.message}
                        <button type="button" class="btn-close p-0 pe-2 my-auto" data-bs-dismiss="alert" aria-label="Close" style="height: 100%;"></button>
                    </div>`)
                if (data.status == 1) {
                    otpInput.html(`
                    <div class="mb-3">
                        <label for="new-password" class="form-label">New Password</label>
                        <input type="password" class="form-control" id="new-password" aria-describedby="emailHelp" name="newPassword" required>
                    </div>
                    <div class="mb-3">
                        <label for="confirm-password" class="form-label">Confirm Password</label>
                        <input type="password" class="form-control" id="confirm-password" aria-describedby="emailHelp" name="confirmPassword" required>
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