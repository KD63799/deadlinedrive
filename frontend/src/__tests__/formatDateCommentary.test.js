import '@testing-library/jest-dom'; //import jest test library
import formatDateCommentary from '../services/formatDateCommentary'; //import component formatDateCommentary

// Test group for formatDate Commentary
describe('formatDateCommentary', () => {
  // Test case to check correct date format
  it('should format the date string correctly', () => {
    const inputDate = '2023-07-16';
    const expectedOutput = '16/07/2023';
  
    const output = formatDateCommentary(inputDate);
  
    expect(output).toBe(expectedOutput);
  });

  // test for invalid date
  it('should handle invalid date inputs gracefully', () => {
    const invalidInputDate = 'not-a-date';
    expect(() => formatDateCommentary(invalidInputDate)).toThrow('Invalid Date');
  });

  // Test for a date with a different time zone
  it('should handle dates with different timezones consistently', () => {
    const inputDateWithTimezone = '2023-07-16T23:59:00Z'; // UTC timezone
    const expectedOutput = '17/07/2023'; // Expected output in French locale, depending on timezone handling
    const output = formatDateCommentary(inputDateWithTimezone);
  
    expect(output).toBe(expectedOutput);
  });

});