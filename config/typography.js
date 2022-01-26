const { white, grayDark} = require("./colors");



const style = StyleSheet.create({
    dropdownTitle: {
        fontSize: 15,
        color: '#456ECD',
        fontFamily: 'Helvetica-Bold',
    },
    dropdownInfo: {
        fontSize: 15,
        color: grayDark,
    },
    baseText: {
        fontFamily: 'Helvetica',
      },
    titleText: {
        fonSize: 24,
        fontWeight: '600',
        color: white,
    },
    sectionText: {
        fontSize: 18,
        fontWeight: '600',
    },
    recommendationTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: white,
    },
    tourText: {
        fontSize: 18,
        fontWeight: '600',
        color: white,
    },
    detailText: {
        fontSize: 14,
        fontWeight: '200',
        color: white,
    },
    summaryText: {
        fontSize: 18,
        fontWeight: '200',
        color: white,
    },
});

module.exports={
    dropdownTitle: style.dropdownTitle,
    dropdownInfo: style.dropdownInfo,
    baseText: style.baseText,
    titleText: style.titleText,
    sectionText: style.sectionText,
    recommendationTitle: style,recommendationTitle,
    tourText: style.tourText,
    detailText: style.detailText,
    summaryText: style.summaryText,
}