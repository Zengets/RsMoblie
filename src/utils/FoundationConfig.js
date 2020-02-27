import { Colors, Typography, Spacings } from 'react-native-ui-lib';
import colors from './ThemeColor';
export default function setTheme() {
    Colors.loadColors(colors);
    Typography.loadTypographies({
        heading: { fontSize: 22, fontWeight: '600' },//标题字号
        subheading: { fontSize: 18, fontWeight: '500' },//副标题字号
        body: { fontSize: 16, fontWeight: 'normal' },//正文字号
        subbody: { fontSize: 14, fontWeight: 'normal' },//辅助文字字号
    });

    Spacings.loadSpacings({
        page: 20, //文本间距
        card: 12, //卡片间距
        gridGutter: 16 //网格间距
    });

}

