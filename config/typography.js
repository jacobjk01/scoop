import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    reg12: { fontSize: 14 },
    reg14: { fontSize: 16 },
    reg16: { fontSize: 18 },
    bold14: { fontSize: 16, fontFamily: 'Helvetica-Bold' },
    bold16: { fontSize: 18, fontFamily: 'Helvetica-Bold' },
    bold18: { fontSize: 20, fontFamily: 'Helvetica-Bold' },
    bold20: { fontSize: 23, fontFamily: 'Helvetica-Bold' },
    bold24: { fontSize: 27, fontFamily: 'Helvetica-Bold' },
    bold32: { fontSize: 35, fontFamily: 'Helvetica-Bold' },
    oblique16: { fontSize: 16, fontFamily: 'Helvetica-Oblique' },
    boldOblique16: { fontSize: 16, fontFamily: 'Helvetica-Oblique', fontWeight: '700'},
});

module.exports={ ...style }