const ActiveTourCard = () => {
  return (
    <TouchableOpacity style={styles.currentTourCard} onPress={() => navigation.navigate('ViewTour', {tour: currentTour})}>
            <View style={{padding: 30}}>
              <Text style={[styles.sectionInfoSubtitleText, {paddingBottom: 0}]}>Current Tour</Text>
                <Text style={styles.sectionTitleText}>{currentTour.name}</Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingLeft: 0}}>
                    <TextQuadrant name='Date' info={capitalizeFirstLetter(currentTour.tourMonth) + ' ' + currentTour.tourDay}/>
                    <TextQuadrant name='Time' info={currentTour.startTime}/>
                    <TextQuadrant name='Visitors' info={currentTour.visitors}/>
                    <TextQuadrant name='Meetup Point' info={currentTour.meetPoint}/>
                </View>
            </View>
    </TouchableOpacity>
  );
}


export default ActiveTourCard