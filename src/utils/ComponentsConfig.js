import { ThemeManager } from 'react-native-ui-lib';
import colors from './ThemeColor'
export default function setConfig() {
    // with plain object
    ThemeManager.setComponentTheme('Card', {
        borderRadius: 8,
    });

    ThemeManager.setComponentTheme('TextField', {
        underlineColor: { default: '#dddddd', error: 'red', focus: colors.primaryColor, disabled: 'grey' },
        style:{color:"#666"}
    });

    // with a dynamic function
    ThemeManager.setComponentTheme('Button', (props, context) => {
        // 'square' is not an original Button prop, but a custom prop that can
        // be used to create different variations of buttons in your app
        if (props.square) {
            return {
                borderRadius: 60,
            };
        }
    });
}

