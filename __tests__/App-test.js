/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// // Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// api
import {
  /* Visitor Functions */
  viewTourSettings,
  convertToTourSummary,
  bookTour,
  cancelTour,
  viewAvailableTours,
  getVisitorBookings,
  /* Guide Functions */
  viewAllTours,
  viewMyTours,
  getAttractions,
  getMeetingPts,
  addTour,
  editTour,
  duplicateTour,
  getGuideBookings
} from '../api/tours';


describe('app', () => {
  it('renders correctly', () => {
    renderer.create(<App />);
  });
})

describe('api/tours', () => {
  it('view tour settings', async () => {
    const f = await viewTourSettings()
    //console.log(f);
  });
})
