// 生成密码的函数
async function generatePassword() {
    const length = parseInt(document.getElementById('length').value, 10);
    if (isNaN(length) || length < 4) {
        alert('密码长度必须大于或等于 4！');
        return;
    }

    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSpecial = document.getElementById('includeSpecial').checked;

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let charPool = '';
    if (includeUppercase) charPool += uppercaseChars;
    if (includeLowercase) charPool += lowercaseChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSpecial) charPool += specialChars;

    if (!charPool) {
        alert('至少选择一种字符类型！');
        return;
    }

    // 显示加载提示
    document.getElementById('loadingMessage').style.display = 'block';
    document.getElementById('passwordDisplay').innerText = '';

    let password = '';
    const chunkSize = 100; // 每次生成的字符数量
    for (let i = 0; i < length; i++) {
        password += charPool.charAt(Math.floor(Math.random() * charPool.length));
        if (i % chunkSize === 0) {
            await new Promise(resolve => setTimeout(resolve, 0)); // 让出主线程，防止卡顿
        }
    }

    // 隐藏加载提示并显示密码
    document.getElementById('loadingMessage').style.display = 'none';
    document.getElementById('passwordDisplay').innerText = password; // 确保密码显示在这里
}

// 复制密码到剪贴板的函数
function copyPassword() {
    const password = document.getElementById('passwordDisplay').innerText;
    if (!password) {
        alert('没有生成的密码可复制！');
        return;
    }
    navigator.clipboard.writeText(password).then(() => {
        alert('密码已复制到剪贴板');
    }, () => {
        alert('复制失败，请手动复制');
    });
}
