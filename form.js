    function setFeeStructure(id, value) {
        const field = document.getElementById("feesStucture_" + id);
        if (field) {
            field.value = value;
        }
    }

    function setDownloadBrochure(id, value) {
        const field = document.getElementById("downloadBrochure_" + id);
        if (field) {
            field.value = value;
        }
    }

    function getQueryParam(param) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param) || '';
    }

    document.addEventListener("DOMContentLoaded", function () {
      const utm_source = getQueryParam('utm_source');
      const utm_medium = getQueryParam('utm_medium');
      const utm_campaign = getQueryParam('utm_campaign');

      // Set UTM values in hidden inputs
      // document.querySelector('input[name="utm_source"]').value = utm_source;
      // document.querySelector('input[name="utm_medium"]').value = utm_medium;
      // document.querySelector('input[name="utm_campaign"]').value = utm_campaign;
      document.getElementById('utm_source_1').value = utm_source;
      document.getElementById('utm_medium_1').value = utm_medium;
      document.getElementById('utm_campaign_1').value = utm_campaign;

      document.getElementById('utm_source_2').value = utm_source;
      document.getElementById('utm_medium_2').value = utm_medium;
      document.getElementById('utm_campaign_2').value = utm_campaign;

      document.getElementById('utm_source_3').value = utm_source;
      document.getElementById('utm_medium_3').value = utm_medium;
      document.getElementById('utm_campaign_3').value = utm_campaign;

      document.getElementById('utm_source_4').value = utm_source;
      document.getElementById('utm_medium_4').value = utm_medium;
      document.getElementById('utm_campaign_4').value = utm_campaign;

      document.getElementById('utm_source_5').value = utm_source;
      document.getElementById('utm_medium_5').value = utm_medium;
      document.getElementById('utm_campaign_5').value = utm_campaign;

      document.getElementById('utm_source_100').value = utm_source;
      document.getElementById('utm_medium_100').value = utm_medium;
      document.getElementById('utm_campaign_100').value = utm_campaign;
    });
  function getReservationType(val,id){
    if($('#branch_'+id).val()=='Haridwar'){
      $('#reservation_type_'+id).html('<option value="">Select Reservation Type</option><option value="Day Scholar">Day Scholar</option>');
    }
  }

  function getCourse(val,id){

    if($('#branch_'+id).val()=='Guwahati Jalukbari'){
      if(val=='Day Scholar'){
        $('#class_'+id).html('<option value="">Select Class</option><option value="E-KIDZ-N (Nursery)">E-KIDZ-N (Nursery)</option><option value="E-KIDZ-PP1 (L.K.G)">E-KIDZ-PP1 (L.K.G)</option><option value="E-KIDZ-PP2 (U.K.G)">E-KIDZ-PP2 (U.K.G)</option><option value="E-CHAMPS-1">E-CHAMPS-1</option><option value="E-CHAMPS-2">E-CHAMPS-2</option><option value="E-CHAMPS-3">E-CHAMPS-3</option><option value="E-CHAMPS-4">E-CHAMPS-4</option><option value="E-CHAMPS-5">E-CHAMPS-5</option><option value="VI">VI</option><option value="VII">VII</option>n>');  
      }  
    }else if($('#branch_'+id).val()=='Haridwar'){
      if(val=='Day Scholar'){
        $('#class_'+id).html('<option value="">Select Class</option><option value="E-KIDZ-N (Nursery)">E-KIDZ-N (Nursery)</option><option value="E-KIDZ-PP1 (L.K.G)">E-KIDZ-PP1 (L.K.G)</option><option value="E-KIDZ-PP2 (U.K.G)">E-KIDZ-PP2 (U.K.G)</option><option value="E-CHAMPS-1">E-CHAMPS-1</option><option value="E-CHAMPS-2">E-CHAMPS-2</option><option value="E-CHAMPS-3">E-CHAMPS-3</option><option value="E-CHAMPS-4">E-CHAMPS-4</option><option value="E-CHAMPS-5">E-CHAMPS-5</option><option value="VI">VI</option><option value="VII">VII</option>');  
      }
    }else if($('#branch_'+id).val()=='Nagaon'){
      if(val=='Day Scholar'){
        $('#class_'+id).html('<option value="">Select Class</option><option value="E-KIDZ-N (Nursery)">E-KIDZ-N (Nursery)</option><option value="E-KIDZ-PP1 (L.K.G)">E-KIDZ-PP1 (L.K.G)</option><option value="E-KIDZ-PP2 (U.K.G)">E-KIDZ-PP2 (U.K.G)</option><option value="E-CHAMPS-1">E-CHAMPS-1</option><option value="E-CHAMPS-2">E-CHAMPS-2</option><option value="E-CHAMPS-3">E-CHAMPS-3</option><option value="E-CHAMPS-4">E-CHAMPS-4</option><option value="E-CHAMPS-5">E-CHAMPS-5</option><option value="VI">VI</option><option value="VII">VII</option><option value="VIII">VIII</option><option value="IX">IX</option>');  
      }  
    }else{
     alert('Please select branch'); 
    }
    

  }
  function getRefresh(val,id){
    $('#board_'+id).html('<option value="">Select Board</option><option value="CBSE">CBSE</option>');
    $('#reservation_type_'+id).html('<option value="">Select Reservation Type</option>');
    $('#class_'+id).html('<option value="">Select Class</option>');

  }


  
  let otpVerified = {};  // per form tracking

// SEND OTP
function sendOTP(id) {
  const btn = document.querySelector(`#frm_admission_open_${id} button[onclick="sendOTP(${id})"]`);
  const btnText = btn.querySelector(".otp-btn-text");
  const sendingText = btn.querySelector(".otp-sending-text"); //new text add here
  const loader = btn.querySelector(".otp-loader");

  btn.disabled = true;
  btnText.classList.add("hidden");
    if (sendingText) sendingText.classList.remove("hidden");
  loader.classList.remove("hidden");


  const name = document.getElementById("name_" + id);
  const phone = document.getElementById("phone_" + id);
  const parent_email = document.getElementById("parent_email_" + id);
  const city = document.getElementById("city_" + id);
  const branch = document.getElementById("branch_" + id);
  const board = document.getElementById("board_" + id);
  const reservation_type = document.getElementById("reservation_type_" + id);
  const classes = document.getElementById("class_" + id);
  const utm_source = document.getElementById("utm_source_" + id);
  const utm_medium = document.getElementById("utm_medium_" + id);
  const utm_campaign = document.getElementById("utm_campaign_" + id);
  const redirect_from = document.getElementById("redirect_from_" + id);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (name.value.trim() === "") {
    stopLoader(); alert("Enter Name");
    return;
  }
  else if (!/^[6-9][0-9]{9}$/.test(phone.value)) {
    stopLoader(); alert("Enter a valid phone number");
    return;
  }
  else if (city.value === "") {
    stopLoader(); alert("Select City");
    return;
  }
  else if (branch.value === "") {
    stopLoader(); alert("Select Branch");
    return;
  }
  else if (board.value === "") {
    stopLoader(); alert("Select Board");
    return;
  }
  else if (reservation_type.value === "") {
    stopLoader(); alert("Select Reservation Type");
    return;
  }
  else if (classes.value === "") {
    stopLoader(); alert("Select Class");
    return;
  }

  fetch("/send-otp.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name.value,
      phone: phone.value,
      parent_email: parent_email.value,
      city: city.value,
      branch: branch.value,
      board: board.value,
      reservation_type: reservation_type.value,
      classes: classes.value,
      utm_source: utm_source.value,
      utm_medium: utm_medium.value,
      utm_campaign: utm_campaign.value,
      redirect_from: redirect_from.value
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {

        document.getElementById("DBid_" + id).value = data.lead_id;

        document.getElementById("otpSection_" + id).style.display = "block";
        document.getElementById("otp_message_" + id).innerHTML =
          "<span class=\"inline-block text-green-700 text-sm font-medium\">OTP sent successfully.</span>";

        document.getElementById("hidden_branch_" + id).value = branch.value;
        name.readOnly = true;
        phone.readOnly = true;
        parent_email.readOnly = true;

        city.disabled = true;
        branch.disabled = true;
        board.disabled = true;
        reservation_type.disabled = true;
        classes.disabled = true;

        document.getElementById("getOtpSection_" + id).style.display = "none";
        document.getElementById("verifyOtpBtn_" + id).style.display = "none";
        document.getElementById("about-get-btn-" + id).style.display = "block";

      } else {
        document.getElementById("otp_message_" + id).innerHTML = "<span class=\"inline-block text-red-700 text-sm font-medium\">" + (data.message || "Something went wrong.") + "</span>";
      }
    })
    .finally(() => {
        stopLoader();
    });
  function stopLoader() {
    btn.disabled = false;
    btnText.classList.remove("hidden");
    if (sendingText) sendingText.classList.add("hidden");
    loader.classList.add("hidden");
  }
}

// VERIFY OTP
function verifyOTP(id) {
  const phone = document.getElementById("phone_" + id).value.trim();
  const DBid = document.getElementById("DBid_" + id).value.trim();
  const userOTP = document.getElementById("otp_input_" + id).value.trim();
  const msgEl = document.getElementById("otp_message_" + id);
  const verifyBtn = event && event.target ? event.target : null;

  if (!/^[6-9][0-9]{9}$/.test(phone)) {
    msgEl.innerHTML = "<span class=\"inline-block text-red-700 py-1.5 text-sm font-medium\">Enter a valid phone first.</span>";
    return;
  }
  if (!/^\d{6}$/.test(userOTP)) {
     msgEl.innerHTML = "<span class=\"inline-block text-red-700 py-1.5 text-sm font-medium\">Enter the 6-digit OTP.</span>";
    return;
  }

  msgEl.innerHTML = "<span class=\"inline-block text-gray-700 text-sm font-medium\">Verifying...</span>";

  fetch("/verify-otp.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone: phone, otp: userOTP, DBid:DBid })
  })
    .then(res => res.json())
    .then(data => {
      if (data && data.status === true) {
        otpVerified[id] = true;
        document.getElementById("otp_verified_" + id).value = "1";
        document.getElementById("otp_input_hidden_" + id).value = userOTP;
        msgEl.innerHTML = "<span class=\"inline-block text-green-700 bg-green-50 rounded-lg px-3 py-1.5 text-sm font-medium\">OTP Verified ✔</span>";
        document.getElementById("phone_" + id).readOnly = true;
        const verifyOtpBtn = document.getElementById("verifyOtpBtn_" + id);
        if (verifyOtpBtn) {
          verifyOtpBtn.style.display = "none";
        }
        const submitBtn = document.getElementById("about-get-btn-" + id);
        if (submitBtn) {
          document.getElementById("otp_input_" + id).readOnly = true;
          submitBtn.style.display = "block";
        }
      } else {
        otpVerified[id] = false;
        document.getElementById("otp_verified_" + id).value = "0";
        const reason = data && data.message ? data.message : "Incorrect OTP";
       msgEl.innerHTML = "<span class=\"inline-block text-red-700 text-sm font-medium\">" + reason + " ❌</span>";
      }
    })
    .catch(err => {
      console.error("verify-otp error:", err);
      otpVerified[id] = false;
      document.getElementById("otp_verified_" + id).value = "0";
      msgEl.innerHTML = "<span style='color:red;'>Server error — try again.</span>";
    });
}

// SUBMIT → VERIFY → SUBMIT
function handleSubmit(id, event) {
  const verified = document.getElementById("otp_verified_" + id).value;

  if (verified === "1") return true;

  event.preventDefault();

  const phone = document.getElementById("phone_" + id).value;
  const otp = document.getElementById("otp_input_" + id).value;
  const DBid = document.getElementById("DBid_" + id).value;
  if (otp.length !== 6) {
    alert("Enter valid 6-digit OTP");
    return;
  }

  fetch("/verify-otp.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone: phone, otp: otp, DBid: DBid })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status) {

        document.getElementById("otp_verified_" + id).value = "1";

        document.getElementById("otp_message_" + id).innerHTML =
"<span class=\"inline-block text-green-700 text-sm font-medium\">OTP Verified ✔</span>";

        document.getElementById("phone_" + id).readOnly = true;
        document.getElementById("otp_input_" + id).readOnly = true;

        document.getElementById("frm_admission_open_" + id).submit();

      } else {
        document.getElementById("otp_message_" + id).innerHTML =
         "<span class=\"inline-block text-red-700 text-sm font-medium\">Invalid OTP ❌</span>";
      }
    });
}
