(function() {
  
  const $ = id => document.getElementById(id);
  let termsOn = false;
  let touched = { name: false, email: false, phone: false, pwd: false, cfm: false, terms: false };

  -
  function setValid(groupId) {
    const group = $(groupId);
    group.classList.remove('err');
    group.classList.add('valid');
  }
  
  function setErr(groupId, errId, msg) {
    const group = $(groupId);
    group.classList.remove('valid');
    group.classList.add('err');
    $(errId).textContent = msg;
  }
  
  function clearFieldStyle(groupId, errId) {
    $(groupId).classList.remove('valid', 'err');
    if(errId) $(errId).textContent = '';
  }

 
  function vName() {
    const val = $('iname').value.trim();
    if (!val) { setErr('gname', 'ename', 'Full name is required.'); return false; }
    if (val.length < 2) { setErr('gname', 'ename', 'At least 2 characters.'); return false; }
    if (!/^[a-zA-Z\s'\-]+$/.test(val)) { setErr('gname', 'ename', 'Use letters, spaces, hyphens, or apostrophes.'); return false; }
    $('ename').textContent = '';
    setValid('gname');
    return true;
  }

  function vEmail() {
    const val = $('iemail').value.trim();
    if (!val) { setErr('gemail', 'eemail', 'Email is required.'); return false; }
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]{2,}$/;
    if (!emailRegex.test(val)) { setErr('gemail', 'eemail', 'Enter a valid email (e.g., name@domain.com).'); return false; }
    $('eemail').textContent = '';
    setValid('gemail');
    return true;
  }

  function vPhone() {
    let val = $('iphone').value.trim();
    if (!val) { setErr('gphone', 'ephone', 'Phone number is required.'); return false; }
    const phoneRegex = /^[\+]?[\d\s\-().]{7,16}$/;
    const digitsOnly = val.replace(/[\s\-().]/g, '');
    if (!phoneRegex.test(val) || digitsOnly.length < 7) {
      setErr('gphone', 'ephone', 'Enter a valid phone (7-15 digits, optional +).');
      return false;
    }
    $('ephone').textContent = '';
    setValid('gphone');
    return true;
  }

  function getPwdChecks(pwd) {
    return {
      length: pwd.length >= 8,
      upper: /[A-Z]/.test(pwd),
      lower: /[a-z]/.test(pwd),
      number: /\d/.test(pwd),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(pwd)
    };
  }

  function updateStrengthMeter(pwd) {
    const checks = getPwdChecks(pwd);
    const ruleMap = { length: 'rl', upper: 'ru', lower: 'rlo', number: 'rn', special: 'rs' };
    for (let key in ruleMap) {
      const el = $(ruleMap[key]);
      if (checks[key]) el.classList.add('ok');
      else el.classList.remove('ok');
    }
    const metCount = Object.values(checks).filter(v => v === true).length;
    const segments = ['s1','s2','s3','s4'];
    const colors = ['#e2e8f0', '#e05252', '#f0a34b', '#e6b422', '#2c9a6e'];
    const labels = ['—', 'Weak', 'Fair', 'Good', 'Strong'];
    const level = Math.min(metCount, 4);
    for (let i = 0; i < segments.length; i++) {
      const seg = $(segments[i]);
      if (i < metCount) seg.style.background = colors[metCount] || '#2c9a6e';
      else seg.style.background = '#e2e8f0';
    }
    $('strlbl').innerText = labels[metCount] || '—';
    $('strlbl').style.color = metCount >= 3 ? '#1f7a56' : (metCount === 2 ? '#b96f0f' : '#a04646');
  }

  function vPwd() {
    const pwd = $('ipwd').value;
    updateStrengthMeter(pwd);
    if (!pwd) { setErr('gpwd', 'epwd', 'Password is required.'); return false; }
    const checks = getPwdChecks(pwd);
    if (!checks.length) { setErr('gpwd', 'epwd', 'Password must be at least 8 characters.'); return false; }
    const metCount = Object.values(checks).filter(Boolean).length;
    if (metCount < 4) { setErr('gpwd', 'epwd', 'Password too weak — needs at least 4 criteria (length, upper, lower, number, or special).'); return false; }
    $('epwd').textContent = '';
    setValid('gpwd');
    if ($('icfm').value && touched.cfm) vCfm();
    return true;
  }

  function vCfm() {
    const cfm = $('icfm').value;
    const pwd = $('ipwd').value;
    if (!cfm) { setErr('gcfm', 'ecfm', 'Please confirm your password.'); return false; }
    if (cfm !== pwd) { setErr('gcfm', 'ecfm', 'Passwords do not match.'); return false; }
    $('ecfm').textContent = '';
    setValid('gcfm');
    return true;
  }

  function vTerms() {
    if (!termsOn) { setErr('gterms', 'eterms', 'You must accept the Terms & Privacy Policy.'); return false; }
    $('eterms').textContent = '';
    $(('gterms')).classList.remove('err');
    return true;
  }

  
  function toggleTermsUI() {
    const box = $('chkbox');
    if (termsOn) {
      box.classList.add('on');
    } else {
      box.classList.remove('on');
    }
    if (touched.terms) vTerms();
  }

 
  $('chkrow').addEventListener('click', (e) => {
    if (e.target.tagName === 'A') return;
    termsOn = !termsOn;
    toggleTermsUI();
    touched.terms = true;
    vTerms();
  });

  $('termsLink').addEventListener('click', (e) => { e.preventDefault(); alert('📄 Terms of Service (demo): you must accept to register.'); });
  $('privacyLink').addEventListener('click', (e) => { e.preventDefault(); alert('🔒 Privacy Policy: your data is safe.'); });

  
  $('iname').addEventListener('input', () => { touched.name = true; vName(); });
  $('iemail').addEventListener('input', () => { touched.email = true; vEmail(); });
  $('iphone').addEventListener('input', () => { touched.phone = true; vPhone(); });
  $('ipwd').addEventListener('input', () => { touched.pwd = true; vPwd(); });
  $('icfm').addEventListener('input', () => { touched.cfm = true; vCfm(); });

 
  ['iname','iemail','iphone','ipwd','icfm'].forEach(id => {
    const map = { iname:'name', iemail:'email', iphone:'phone', ipwd:'pwd', icfm:'cfm' };
    $(id).addEventListener('blur', () => {
      if(!touched[map[id]]) {
        touched[map[id]] = true;
        if (id === 'iname') vName();
        else if (id === 'iemail') vEmail();
        else if (id === 'iphone') vPhone();
        else if (id === 'ipwd') vPwd();
        else if (id === 'icfm') vCfm();
      }
    });
  });


  $('togpwd').addEventListener('click', () => {
    const inp = $('ipwd');
    const isPassword = inp.type === 'password';
    inp.type = isPassword ? 'text' : 'password';
    $('eyeO').style.display = isPassword ? 'none' : '';
    $('eyeC').style.display = isPassword ? '' : 'none';
  });

  
  function shakeButton() {
    const btn = $('subbtn');
    btn.style.animation = 'none';
    btn.offsetHeight;
    btn.style.animation = 'shk 0.35s ease';
    setTimeout(() => { btn.style.animation = ''; }, 350);
  }

  
  function doSubmit() {
    touched = { name: true, email: true, phone: true, pwd: true, cfm: true, terms: true };
    const nameOk = vName();
    const emailOk = vEmail();
    const phoneOk = vPhone();
    const pwdOk = vPwd();
    const cfmOk = vCfm();
    const termsOk = vTerms();
    if (!(nameOk && emailOk && phoneOk && pwdOk && cfmOk && termsOk)) {
      shakeButton();
      return;
    }
    const btn = $('subbtn');
    const originalLabel = $('btnlbl').innerText;
    $('btnlbl').innerText = 'Creating…';
    btn.disabled = true;
    setTimeout(() => {
      $('iname').value = '';
      $('iemail').value = '';
      $('iphone').value = '';
      $('ipwd').value = '';
      $('icfm').value = '';
      termsOn = false;
      toggleTermsUI();
      updateStrengthMeter('');
      ['gname','gemail','gphone','gpwd','gcfm','gterms'].forEach(g => $(g).classList.remove('valid','err'));
      ['ename','eemail','ephone','epwd','ecfm','eterms'].forEach(e => $(e).textContent = '');
      touched = { name: false, email: false, phone: false, pwd: false, cfm: false, terms: false };
      $('btnlbl').innerText = originalLabel;
      btn.disabled = false;
      $('succbanner').style.display = 'flex';
      setTimeout(() => { $('succbanner').style.display = 'none'; }, 3800);
    }, 900);
  }

  window.doSubmit = doSubmit;
  $('subbtn').onclick = doSubmit;
  toggleTermsUI();
  updateStrengthMeter('');
})();
