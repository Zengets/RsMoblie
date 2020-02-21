import Toast from 'react-native-root-toast'; // 引入类库

let toast = null;

let OpenToast = (title,backgroundColor,onShow,onShown,onHide,onHidden) => {
    toast = Toast.show(title, {
        duration: Toast.durations.LONG, // toast显示时长
        position: Toast.positions.BOTTOM, // toast位置
        shadow: true, // toast是否出现阴影
        animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
        hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
        delay: 0, // toast显示的延时
        backgroundColor:backgroundColor?backgroundColor:"rgba(0,0,0,0.8)",
        onShow: () => {
            onShow?onShow():null
            // toast出现回调（动画开始时）
        },
        onShown: () => {
            onShown?onShown():null
            // toast出现回调（动画结束时）
        },
        onHide: () => {
            onHide?onHide():null
            // toast隐藏回调（动画开始时）
        },
        onHidden: () => {
            onHidden?onHidden():null
            // toast隐藏回调（动画结束时）
        }
    });
} 
let HideToast = () => {
    toast?
    Toast.hide(toast):
    null
} 

let OneToast = ( title,backgroundColor,onShow,onShown,onHide,onHidden )=>{
    HideToast();
    OpenToast(title,backgroundColor,onShow,onShown,onHide,onHidden);
}

export { OpenToast,HideToast,OneToast }