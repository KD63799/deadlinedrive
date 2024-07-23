import React from 'react';
import '@testing-library/jest-dom';
import formatDateCalendar from '../services/formatDateCalendar';

describe('formatDateCalendar', () => {
    it('should format the date correctly', () => {
      // Arrange
      const inputDateString = '2024-07-17T15:30:45.000Z';
      const expectedOutput = '2024-07-17 15:30:45';
  
      // Act
      const result = formatDateCalendar(inputDateString);
  
      // Assert
      expect(result).toBe(expectedOutput);
    });
  
    it('should pad single digit month, day, hours, minutes, and seconds with zeros', () => {
      // Arrange
      const inputDateString = '2024-01-01T01:01:01.000Z';
      const expectedOutput = '2024-01-01 01:01:01';
  
      // Act
      const result = formatDateCalendar(inputDateString);
  
      // Assert
      expect(result).toBe(expectedOutput);
    });
  
    // Add more tests if needed
  });