import { ajax } from '/js/ajax.js';

const $id = document.getElementById('id');
const $pw = document.getElementById('pw');

const $errId = document.querySelector('.err.id');
const $errPw = document.querySelector('.err.pw');

// onsubmit="return validateForm()" true면 submit 가능! false면 submit 이벤트 막음!
const validateForm = () => {
  if (
    $id.value &&
    $pw.value &&
    $errId.classList.contains('hidden') &&
    $errPw.classList.contains('hidden')
  ) {
    return true;
  } else {
    return false;
  }
};

$id.addEventListener('keydown', e => {
  if (e.key === ' ') {
    e.preventDefault();
  }
  const input = $id.value;
  const lenOfInput = input.length;

  if (e.key != 'Enter') {
    return;
  }
  if (e.key == 'Enter') {
    if (/[^A-Za-z0-9]/.test(input)) {
      $errId.classList.remove('hidden');
      $errId.textContent = '* 영문과 숫자만 입력 가능합니다.';
      $id.focus();
      return;
    }
    if (lenOfInput == 0) {
      $errId.classList.remove('hidden');
      $errId.textContent = '* 아이디를 입력해 주세요.';
      $id.focus();
      $id.value = '';
    } else if (lenOfInput > 15) {
      $errId.classList.remove('hidden');
      $errId.textContent = '* 아이디는 15글자 이하로 입력 가능합니다.';
      $id.focus();
    } else {
      $errId.classList.add('hidden');
      $pw.focus();
    }
    return;
  }
});

$id.addEventListener('blur', e => {
  const input = document.getElementById('id').value;
  const lenOfInput = input.length;
  const $login = document.getElementById('login');

  if (/[^A-Za-z0-9]/.test(input)) {
    $errId.classList.remove('hidden');
    $errId.textContent = '* 영문과 숫자만 입력 가능합니다.';
    return;
  }
  if (lenOfInput == 0) {
    $errId.classList.remove('hidden');
    $errId.textContent = '* 아이디를 입력해 주세요.';
    $id.value = '';
  } else if (lenOfInput > 15) {
    $errId.classList.remove('hidden');
    $errId.textContent = '* 아이디는 15글자 이하로 입력 가능합니다.';
  } else {
    $errId.classList.add('hidden');
  }
});

$pw.addEventListener('keydown', e => {
  if (e.key === ' ') {
    e.preventDefault();
  }
  const input = document.getElementById('pw').value;
  //password는 값을 가져와서 바로 trim이 안됨
  const lenOfInput = input.length;
  const $login = document.getElementById('login');

  if (e.key != 'Enter') {
    return;
  }

  if (e.key == 'Enter') {
    if (/[^A-Za-z0-9]/.test(input)) {
      $errPw.classList.remove('hidden');
      $errPw.textContent = '* 영문과 숫자만 입력 가능합니다.';
      $pw.focus();
      return;
    }
    if (lenOfInput == 0) {
      $errPw.classList.remove('hidden');
      $errPw.textContent = '* 비밀번호를 입력해 주세요.';
      $pw.focus();
      $pw.value = '';
    } else if (lenOfInput < 8 || lenOfInput > 15) {
      $errPw.classList.remove('hidden');
      $errPw.textContent =
        '* 영문자, 숫자조합으로 8글자 이상 15글자 이하 입력 가능합니다.';
      $pw.focus();
    } else {
      $errPw.classList.add('hidden');
      $login.focus();
    }
    return;
  }
});

$pw.addEventListener('blur', e => {
  const input = document.getElementById('pw').value;
  const lenOfInput = input.length;
  const $login = document.getElementById('login');

  if (/[^A-Za-z0-9]/.test(input)) {
    $errPw.classList.remove('hidden');
    $errPw.textContent = '* 영문과 숫자만 입력 가능합니다.';
    return;
  }
  if (lenOfInput == 0) {
    $errPw.classList.remove('hidden');
    $errPw.textContent = '* 비밀번호를 입력해 주세요.';
    $pw.value = '';
  } else if (lenOfInput < 8 || lenOfInput > 15) {
    $errPw.classList.remove('hidden');
    $errPw.textContent =
      '* 영문자, 숫자조합으로 8글자 이상 15글자 이하 입력 가능합니다.';
  } else {
    $errPw.classList.add('hidden');
  }
});

$id.addEventListener('input', e => {
  const $err = document.querySelector('.err.userId');
  if ($err !== null && !$err.classList.contains('hidden')) {
    e.preventDefault();
    $err.classList.add('hidden');
  }
});
$pw.addEventListener('input', e => {
  const $err = document.querySelector('.err.userPw');
  if ($err !== null && !$err.classList.contains('hidden')) {
    e.preventDefault();
    $err.classList.add('hidden');
  }
});

const $findIdEmail = document.getElementById('findIdEmail');
const $errEmail = document.querySelector('.err.findIdEmail');

const $findId = document.getElementById('findId');
const $checkId = document.getElementById('checkId');
const $resId = document.getElementById('resId');
const $loginGo = document.getElementById('loginGo');
const $checkPw = document.getElementById('checkPw');

const $findIdPopup = document.getElementById('findIdPopup');
const $findIdPopup2 = document.getElementById('findIdPopup2');

const $findPw = document.getElementById('findPw');
const $checkPassword = document.getElementById('checkPassword');
const $loginGo2 = document.getElementById('loginGo2');

const $findPwPopup = document.getElementById('findPwPopup');
const $findPwPopup2 = document.getElementById('findPwPopup2');

$findId.addEventListener('click', e => {
  $findIdPopup.showModal();
});

$findPw.addEventListener('click', e => {
  $findPwPopup.showModal();
});


$loginGo.addEventListener('click', e => {
  $findIdPopup2.close();
});

$checkPw.addEventListener('click', e => {
  $findIdPopup2.close();
  $findPwPopup.showModal();
});

$checkPassword.addEventListener('click', e => {
  $findPwPopup.close();
  $findPwPopup2.showModal();
});

$loginGo2.addEventListener('click', e => {
  $findPwPopup2.close();
});

//이메일 중복체크
const chkEmail = res => {
  if (res.header.rtcd == '00') {
    if (res.data) {
      $errEmail.style = 'color : green';
      $errEmail.textContent = '가입된 계정이 있습니다.';
    } else {
      $errEmail.style = 'color : red';
      $errEmail.textContent = '가입된 계정이 없습니다.';
    }
  } else {
    $errEmail.textContent = `${res.header.rtmsg}`;
  };
  return;
};

const chkEmail_h = () => {
  const url = `/api/members/email?email=${$findIdEmail.value}`;
  ajax
    .get(url)
    .then(res => res.json())
    .then(chkEmail) //res=>chkEmail(res)
    .catch(console.error); //err=>console.error(err)
};

//이메일
$findIdEmail.addEventListener('keydown', e => {
  const input = $findIdEmail.value;
  const lenOfInput = input.length;
  const emailRegex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@(?:\w+\.)+\w+$/;

  if (e.key == 'Enter'){
    e.preventDefault();
  }

  if (e.key === ' ') {
    e.preventDefault();
  }

  if (e.key != 'Enter') {
    return;
  }
  if (e.key == 'Enter') {
    if (lenOfInput == 0) {
      $errEmail.classList.remove('hidden');
      $errEmail.style = 'color : red';
      $errEmail.textContent = '* 이메일를 입력해 주세요.';
      $findIdEmail.focus();
      $findIdEmail.value = '';
    } else if (!emailRegex.test(input)) {
      $errEmail.classList.remove('hidden');
      $errEmail.style = 'color : red';
      $errEmail.textContent = '* 이메일 양식에 맞게 입력해 주세요.';
      $findIdEmail.focus();
    } else {
      chkEmail_h();
      if ($errEmail.style.color === 'green') {
//        $emailCheck.focus();
      }
    }
    return;
  };
  return;
});

$findIdEmail.addEventListener('blur', e => {
  const input = $findIdEmail.value;
  const lenOfInput = input.length;
  const emailRegex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@(?:\w+\.)+\w+$/;

  if (lenOfInput == 0) {
    $errEmail.classList.remove('hidden');
    $errEmail.style = 'color : red';
    $errEmail.textContent = '* 이메일를 입력해 주세요.';
    $findIdEmail.value = '';
  } else if (!emailRegex.test(input)) {
    $errEmail.classList.remove('hidden');
    $errEmail.style = 'color : red';
    $errEmail.textContent = '* 이메일 양식에 맞게 입력해 주세요.';
  } else {
    chkEmail_h();
  }
  return;
});

// 아이디 찾기 및 결과 보여주기
const findIdByEmail = res => {
  if (res.header.rtcd == '00') {
    if (res.data) {
      $resId.textContent = res.data;
    } else {
      $resId.style = 'color : red';
      $resId.textContent = '오류';
    }
  } else {
    $resId.textContent = `${res.header.rtmsg}`;
  };
  return;
};

const findIdByEmail_h = () => {
  const url = `/api/members/findIdByEmail?email=${$findIdEmail.value}`;
  ajax
    .get(url)
    .then(res => res.json())
    .then(findIdByEmail) //res=>chkEmail(res)
    .catch(console.error); //err=>console.error(err)
};

$checkId.addEventListener('click', e => {
    if($errEmail.style.color === 'green'){
          findIdByEmail_h();
          $findIdPopup.close();
          $findIdPopup2.showModal();
    };
});
