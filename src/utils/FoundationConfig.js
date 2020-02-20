import { Colors, Typography, Spacings } from 'react-native-ui-lib';
import colors from './ThemeColor';
export default function setTheme() {
    Colors.loadColors(colors);
    Typography.loadTypographies({
        heading: { fontSize: 22, fontWeight: '600' },
        subheading: { fontSize: 18, fontWeight: '500' },
        body: { fontSize: 16, fontWeight: 'normal' },
        subbody: { fontSize: 14, fontWeight: 'normal' },
    });

    Spacings.loadSpacings({
        page: 20,
        card: 12,
        gridGutter: 16
    });

}

