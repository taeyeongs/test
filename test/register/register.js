const userid = document.querySelector('#userid');
const pwd1 = document.querySelector('#pwd1');
const pwd2 = document.querySelector('#pwd2');
const level = document.querySelector('#level');
const fullname = document.querySelector('#fullname');
const email = document.querySelector('#email');
const tel = document.querySelector('#tel');
const submitButton = document.querySelector('#submit_button');

submitButton.addEventListener('click', function() {
    //아이디: 공백여부/ 중복여부
    //비밀번호 : 공백여부/ 즉수문자, 문자, 숫자 포함 형태의 8~15자리를 입력하세요
    //비밀번호 확인: 공백여부 / 비밀번호와 같은지 안같은지
    // 이름 : 공백여부
    // 메일주소 : 공백여부 / 메일 형식에 맞는지(test@test.com)
    //연락처(필수X) : 연락처 형식에 맞는지(010-2222-3333)

    let chkArray = [idConfirm(), pwd1Confirm(), pwd2Confirm(), fullnameConfirm(), emailConfirm(), telConfirm()];

    let chkFlag = true;
    for (const chk of chkArray) {
        // if(chk === false)
        if(!chk){ // 함수의 리턴값이 false 일때
            chkFlag = false;
        }
    }
    if (chkFlag) {
        document.signup.submit();
    }
    // const idConf= idConfirm();
    // const pwd1Conf= pwd1Confirm()
    // const pwd2Conf= pwd2Confirm()
    // const fullnameConf= fullnameConfirm()
    // const emailConf= emailConfirm()
    // const telConf= telConfirm()

    // if(idConf && pwd1Conf && pwd2Conf && fullnameConf && emailConf && telConf) {
    //     document.signup.submit()
    // }
})

function idConfirm() {
    const mustid = document.querySelector(".must_id")
    const overlap = document.querySelector(".overlap")

    //텍스트가 남아있는걸 방지하기 위해
    mustid.style.display = "none"
    overlap.style.display = "none"

    //console.log(mustid);
    // null, undefined, "", 0 은 false
    // userid 가 빈문자열이 됐을때
    // if(userid.value === "") {}
    console.log('||'+(userid.value).trim()+'||')
    if(!userid.value.trim()) {
        
        mustid.style.display = "block"
        return false
    } else {
        // if(idCheck(userid.value) === false)
        if (!idCheck(userid.value)) { //아이디가 중복이라면
            overlap.style.display = "block"
            return false
        }
    }
    return true
}
function pwd1Confirm() {
    const mustpwd1 = document.querySelector(".must_pwd1")
    const regpwd = document.querySelector(".reg_pwd")

    mustpwd1.style.display = "none"
    regpwd.style.display = "none"

    if(!pwd1.value) {
        mustpwd1.style.display = "block"
        return false
    } else {
        if (!pwdCheck(pwd1.value)) { //정규표현식에 맞지 않으면
            console.log(1111 ,  pwd1.value, pwdCheck(pwd1.value));
            regpwd.style.display = "block"
            return false
        }
    }
    return true
}

function pwd2Confirm() {
    const mustpw2 = document.querySelector(".must_pwd2")
    const same = document.querySelector(".same")

    mustpw2.style.display = "none"
    same.style.display = "none"

    if(!pwd2.value) {
        mustpw2.style.display = "block"
        return false
    } else {
        if (pwd1.value && pwd2.value) { //두 패스워드 값이 있는지 확인
            if (pwd1.value !== pwd2.value) { // 두 패스워드가 같지 않다면
                same.style.display = "block"
                return false
            }
        }
    }
    return true
}

function fullnameConfirm() {
    const mustfullname = document.querySelector(".must_fullname")

    mustfullname.style.display = "none"

    if(!fullname.value) {
        mustfullname.style.display = "block"
        return false
    }
    return true
}

function emailConfirm() {
    const mustemail = document.querySelector(".must_email")
    const regemail = document.querySelector(".reg_email")

    mustemail.style.display = "none"
    regemail.style.display = "none"

    if(!email.value) {
        mustemail.style.display = "block"
        return false
    } else {
        if (!emailCheck(email.value)) { //정규표현식에 맞지 않으면
            regemail.style.display = "block"
            return false
        }
    }
    return true
}

function telConfirm() {
    const regtel = document.querySelector(".reg_tel")
    regtel.style.display = "none"

    //전화번호가 있고 정규식 체크(유효성)에 통화하지 못했을 때
    if (!telCheck(tel.value) && tel.value) { //정규표현식에 맞지 않으면
        regtel.style.display = "block"
        return false
    }
    return true    
}

//중복된 아이디 체크
function idCheck(id) {
    return true
}

// https://tjddnjs625.tistory.com/28
//정규식 테스트 사이트: https://regexr.com/

//비밀번호 정규식 체크
function pwdCheck(pwd) {
    //특수문자/ 문자/ 숫자를 포함 형태의 8~15자리 이내의 암호 정규식(3가지 조합)
    const reg = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

    return reg.test(pwd);
}

function telCheck(tel) {
  const reg = /^\d{2,3}-\d{3,4}-\d{4}$/;
  return reg.test(tel);
}

function emailCheck(email) {
  const reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return reg.test(email);
}

