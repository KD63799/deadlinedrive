import getUserFirstName from "../services/GetUserFirstName";

describe('getUserFirstName', () => {

    //Test if user first name is found
  it('should return the first name of the user if user is found', () => {
    const users = [
        { id: 110, firstName: "Jérôme" },
        { id: 103, firstName: "Musiala" },
         ];
        expect(getUserFirstName(110, users)).toBe('Jérôme'),
        expect(getUserFirstName(103, users)).toBe('Musiala')
  });

     //Test if user is not found
  it('should return the unknown user if user is not found', () => {
    const users = [
        { id: 110, firstName: "Jérôme" },
        { id: 103, firstName: "Musiala" },
         ];
        expect(getUserFirstName(110, users)).toBe('Jérôme')
  });

  //Test if user id is not a number
  it('should return "Unknown User" if id is not a number', () => {
    const users = [
        { id: 110, firstName: "Jérôme" },
        { id: 103, firstName: "Musiala" }
         ];
        expect(getUserFirstName('abc', users)).toBe('Unknown User')
  });
})