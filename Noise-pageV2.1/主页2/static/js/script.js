function handlePress(event) {
    this.classList.add('pressed');
}

function handleRelease(event) {
    this.classList.remove('pressed');
}

function handleCancel(event) {
    this.classList.remove('pressed');
}

var buttons = document.querySelectorAll('.projectItem');
buttons.forEach(function (button) {
    button.addEventListener('mousedown', handlePress);
    button.addEventListener('mouseup', handleRelease);
    button.addEventListener('mouseleave', handleCancel);
    button.addEventListener('touchstart', handlePress);
    button.addEventListener('touchend', handleRelease);
    button.addEventListener('touchcancel', handleCancel);
});

function toggleClass(selector, className) {
    var elements = document.querySelectorAll(selector);
    elements.forEach(function (element) {
        element.classList.toggle(className);
    });
}



function setCookie(name, value, days) {
    var expires = days ? "; expires=" + (new Date(Date.now() + days * 24 * 60 * 60 * 1000)).toUTCString() : "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith(nameEQ)) {
            return cookie.substring(nameEQ.length);
        }
    }
    return null;
}

document.addEventListener('DOMContentLoaded', function () {
    var html = document.querySelector('html');
    var themeState = getCookie("themeState") || "Light";
    var Checkbox = document.getElementById('myonoffswitch');

    function changeTheme(theme) {
        html.dataset.theme = theme;
        setCookie("themeState", theme, 365);
        themeState = theme;
    }

    Checkbox.addEventListener('change', function () {
        if (themeState == "Dark") {
            changeTheme("Light");
        } else {
            changeTheme("Dark");
        }
    });

    if (themeState == "Dark") {
        Checkbox.checked = false;
    }

    changeTheme(themeState);
});

const projectItemRightimg = document.querySelector('.projectItemRightimg');
const img = document.getElementById('img-1');

// 克隆第一张图片并添加到末尾以实现循环效果
const firstImg = projectItemRightimg.firstElementChild.cloneNode(true);
projectItemRightimg.appendChild(firstImg);

let startX = 0;
let scrollLeft = 0;
let autoScrollInterval = null;
const autoScrollSpeed = 0.5; // 调整自动滑动的速度，值越小滑动越慢

function handleMouseDown(e) {
    e.preventDefault();
    startX = e.pageX - projectItemRightimg.offsetLeft;
    scrollLeft = projectItemRightimg.scrollLeft;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseUp);
    stopAutoScroll(); // 当用户开始手动滑动时，停止自动滑动
}

function handleMouseMove(e) {
    const x = e.pageX - projectItemRightimg.offsetLeft;
    const walk = (x - startX) * 3; // 滑动速度
    projectItemRightimg.scrollLeft = scrollLeft - walk;
}

function handleMouseUp() {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mouseleave', handleMouseUp);
    startAutoScroll(); // 当用户停止手动滑动时，重新开始自动滑动
}

function handleTouchStart(e) {
    startX = e.touches[0].pageX - projectItemRightimg.offsetLeft;
    scrollLeft = projectItemRightimg.scrollLeft;
    stopAutoScroll(); // 当用户开始触摸滑动时，停止自动滑动
}

function handleTouchMove(e) {
    e.preventDefault();
    const x = e.touches[0].pageX - projectItemRightimg.offsetLeft;
    const walk = (x - startX) * 3; // 滑动速度
    projectItemRightimg.scrollLeft = scrollLeft - walk;
}

function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        projectItemRightimg.scrollLeft += autoScrollSpeed;
        // 检查是否滚动到了克隆的图片区域，这里减去2是位移的缓冲
        if (projectItemRightimg.scrollLeft >= projectItemRightimg.scrollWidth - projectItemRightimg.clientWidth - 2) {
            // 如果滚动到了克隆的图片，立即返回到正确的位置
            projectItemRightimg.scrollLeft = 0;
        }
    }, 16); //大约每秒60帧
}

function stopAutoScroll() {
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }
}

// 懒加载功能
function lazyLoad() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const config = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    let observer = new IntersectionObserver((entries, self) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                self.unobserve(img);
            }
        });
    }, config);

    lazyImages.forEach(image => {
        observer.observe(image);
    });
}

// 初始化懒加载
document.addEventListener('DOMContentLoaded', lazyLoad);

// 添加事件监听器
projectItemRightimg.addEventListener('mousedown', handleMouseDown);
projectItemRightimg.addEventListener('touchstart', handleTouchStart);
projectItemRightimg.addEventListener('touchmove', handleTouchMove);

// 开始自动滑动
startAutoScroll();

// 图片弹出监听
function pop(imgPath) {
    document.getElementById('popupImage').src = imgPath;
    document.getElementById('imagePopup').style.display = 'block';
    document.getElementById('imagePopup').addEventListener('click', closePopup);
}

function closePopup() {
    document.getElementById('imagePopup').style.display = 'none';
    document.getElementById('imagePopup').removeEventListener('click', closePopup);
}
//手机左侧弹出
document.addEventListener('DOMContentLoaded', function () {
    var mobileNavButton = document.querySelector('.mobile-nav-button');
    var noiseLeft = document.querySelector('.noise-left');
    mobileNavButton.addEventListener('click', function () {
        if (noiseLeft.style.display === 'block') {
            noiseLeft.style.display = 'none';
        } else {
            noiseLeft.style.display = 'block';
        }
        // 切换侧边栏的显示状态
        if (noiseLeft.classList.contains('show')) {
            noiseLeft.classList.remove('show');
            mobileNavButton.style.left = '10px';
        } else {
            noiseLeft.classList.add('show');
            mobileNavButton.style.left = '50%';

        }
    });
});

// 视频播放组件
var videos = [
    "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/f83b646a4cee41e588ca023e2a114e2f.mp4",
    "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/bc6473e95d7f4bd1ba2f91d1cf632dfe.mp4",
];  // 视频链接数组
var currentVideoIndex = 0; // 当前视频索引

// 播放视频
function playVideo() {
    var video = document.getElementById("random-video");
    video.play();
}

// 切换播放/暂停
function togglePlay() {
    var video = document.getElementById("random-video");
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}
// 获取视频元素和播放/暂停按钮
var video = document.getElementById("random-video");
var playPauseBtn = document.getElementById("play-pause-btn");

// 切换播放和暂停的函数
function togglePlay() {
    if (video.paused || video.ended) {
        video.play();
        playPauseBtn.textContent = "⏸"; // 播放时显示暂停图标
    } else {
        video.pause();
        playPauseBtn.textContent = "▶"; // 暂停时显示播放图标
    }
}
// 随机选择一个视频
function randomVideo() {
    currentVideoIndex = Math.floor(Math.random() * videos.length);
    updateVideo();
}

// 播放下一个视频
function nextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    updateVideo();
    playVideo();
}

// 播放上一个视频
function prevVideo() {
    currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
    updateVideo();
    playVideo();
}

// 更新视频
function updateVideo() {
    var video = document.getElementById("random-video");
    video.src = videos[currentVideoIndex];
    video.load();
}

// 监听视频错误事件，自动跳过失效视频
document.getElementById("random-video").addEventListener('error', function () {
    console.log("视频加载失败，尝试下一个视频");
    nextVideo(); // 直接调用nextVideo()来尝试下一个视频
});

// 监听视频结束事件，自动播放下一个视频
// document.getElementById("random-video").addEventListener('ended', function() {
//     nextVideo(); // 直接调用nextVideo()来播放下一个视频
// });

// 初始化，随机选择一个视频进行播放
randomVideo();
// 创建一个命名空间
var MyVideoPlayer = MyVideoPlayer || {};

// 在命名空间中定义预加载视频的函数
MyVideoPlayer.preloadVideos = function () {
    // 预加载当前视频
    var currentVideo = new Video();
    currentVideo.src = MyVideoPlayer.videos[MyVideoPlayer.currentVideoIndex];

    // 预加载接下来的几个视频
    var nextVideosToPreload = 3; // 预加载的视频数量
    for (var i = 1; i <= nextVideosToPreload; i++) {
        var nextVideo = new Video();
        nextVideo.src = MyVideoPlayer.videos[(MyVideoPlayer.currentVideoIndex + i) % MyVideoPlayer.videos.length];
    }
};

// 使用事件监听器来添加页面加载时的处理函数
window.addEventListener('load', function () {
    MyVideoPlayer.preloadVideos();
});

//pc头像logo
let images = ['https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo10.gif',
    'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo9.gif',
    'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo7.gif',
    'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo6.gif',
]; // 图片数组
let currentImageIndex = -1; // 初始化为-1，表示还没有选择图片
const logoDiv = document.getElementById('logoDiv');
const defaultImage = 'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo10.gif'; // 默认图片路径

function setDefaultImage() {
    logoDiv.style.backgroundImage = `url(${defaultImage})`;
}

function loadImage(index) {
    let img = new Image();
    img.onload = function () {
        logoDiv.style.backgroundImage = `url(${images[index]})`;
        currentImageIndex = index; // 更新当前图片索引
    };
    img.onerror = function () {
        // 如果图片加载失败，尝试下一张
        if (index < images.length - 1) {
            loadImage(index + 1);
        } else {
            // 如果所有图片都尝试过，则使用默认图像
            setDefaultImage();
        }
    };
    img.src = images[index];
}

// 初始化，随机选择一个图片进行加载
loadImage(Math.floor(Math.random() * images.length));

// 添加点击事件监听器
logoDiv.addEventListener('click', () => {
    // 重置当前图片索引，以便重新随机选择
    currentImageIndex = -1;
    loadImage(Math.floor(Math.random() * images.length));
});

// 使用IntersectionObserver来实现懒加载
let observer = new IntersectionObserver((entries, observer) => {
    // 检查元素是否可见
    if (entries[0].isIntersecting) {
        // 如果已经加载过图片，不再重新加载
        if (currentImageIndex === -1) {
            loadImage(Math.floor(Math.random() * images.length));
        }
    }
}, { threshold: [0] });

observer.observe(logoDiv);

// 手机页面头部logo
let mobileImages = ['https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/mobileLogo7.gif',
    'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/mobileLogo1.gif',
    'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/mobileLogo2.gif',
    'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/mobileLogo3.gif',
]; // 图片数组
let currentMobileImageIndex = -1; // 初始化为-1，表示还没有选择图片
const mobileLogoDiv = document.getElementById('mobileLogoDiv');
const defaultMobileImage = 'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/mobileLogo7.gif'; // 默认手机图片路径

function setDefaultMobileImage() {
    mobileLogoDiv.style.backgroundImage = `url(${defaultMobileImage})`;
}

function loadMobileImage(index) {
    let img = new Image();
    img.onload = function () {
        mobileLogoDiv.style.backgroundImage = `url(${mobileImages[index]})`;
        currentMobileImageIndex = index; // 更新当前手机图片索引
    };
    img.onerror = function () {
        // 如果图片加载失败，尝试下一张
        if (index < mobileImages.length - 1) {
            loadMobileImage(index + 1);
        } else {
            // 如果所有图片都尝试过，则使用默认图像
            setDefaultMobileImage();
        }
    };
    img.src = mobileImages[index];
}

// 初始化，随机选择一个图片进行加载
loadMobileImage(Math.floor(Math.random() * mobileImages.length));

// 添加点击事件监听器
mobileLogoDiv.addEventListener('click', () => {
    // 重置当前图片索引，以便重新随机选择
    currentMobileImageIndex = -1;
    loadMobileImage(Math.floor(Math.random() * mobileImages.length));
});

// 使用IntersectionObserver来实现懒加载
let mobileObserver = new IntersectionObserver((entries, observer) => {
    // 检查元素是否可见
    if (entries[0].isIntersecting) {
        // 如果已经加载过图片，不再重新加载
        if (currentMobileImageIndex === -1) {
            loadMobileImage(Math.floor(Math.random() * mobileImages.length));
        }
    }
}, { threshold: [0] });
mobileObserver.observe(mobileLogoDiv);
/*scroll向下滑动*/
let container = document.querySelector('.workbox');
if (window.innerWidth >720) {
	container.addEventListener('wheel',(event) => {
	event.preventDefault();
	for (var i=0;i<100;i++){
		setTimeout(() => container.scrollLeft += event.deltaY/100,i);
}})};
