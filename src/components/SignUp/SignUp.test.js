import { render, screen , fireEvent, act} from '@testing-library/react'
import SignUp from './SignUp';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../AuthContext';

const MockLogin = () => {
    return (
        <AuthProvider >
            <Router>
                <SignUp />
            </Router>
        </AuthProvider>
    )
}
describe.skip('SignUp Component Test', () => {
    it('username input is working', () => {
        render(<MockLogin />);
        const inputElement = screen.getByTestId(/signUserId/i);
        fireEvent.change(inputElement, { target: { value: "gilbear"} })
        expect(inputElement.value).toBe("gilbear");
    });
    it('password input is working', () => {
        render(<MockLogin />);
        const inputElement = screen.getByTestId(/signPassId/i);
        fireEvent.change(inputElement, { target: { value: "portfolio"} })
        expect(inputElement.value).toBe("portfolio");
    });
    it('password input is working', () => {
        render(<MockLogin />);
        const inputElement = screen.getByTestId(/signPassCopyId/i);
        fireEvent.change(inputElement, { target: { value: "portfolio"} })
        expect(inputElement.value).toBe("portfolio");
    });
    it('username input is too short', () => {
        render(<MockLogin />);
        const inputElement = screen.getByTestId(/signUserId/i);
        const buttonElement = screen.getByRole("button", {name: /Submit/i})
        fireEvent.change(inputElement, { target: { value: "gi"} })
        fireEvent.click(buttonElement)
        const errorDiv = screen.getByTestId(/errorDiv/i);
        expect(errorDiv.textContent).toBe("Username must be between 3-15 characters");
    });
    it('username input is too long', () => {
        render(<MockLogin />);
        const inputElement = screen.getByTestId(/signUserId/i);
        const buttonElement = screen.getByRole("button", {name: /Submit/i})
        fireEvent.change(inputElement, { target: { value: "gilbeargilbeargilbear"} })
        fireEvent.click(buttonElement)
        const errorDiv = screen.getByTestId(/errorDiv/i);
        expect(errorDiv.textContent).toBe("Username must be between 3-15 characters");
    });
    it('password input is too short', () => {
        render(<MockLogin />);
        const inputUsername = screen.getByTestId(/signUserId/i);
        const inputPassword = screen.getByTestId(/signPassId/i);
        const buttonElement = screen.getByRole("button", {name: /Submit/i})
        fireEvent.change(inputUsername, { target: { value: "gilbear"} })
        fireEvent.change(inputPassword, { target: { value: "12"} })
        fireEvent.click(buttonElement)
        const errorDiv = screen.getByTestId(/errorDiv/i);
        expect(errorDiv.textContent).toBe("Password must be between 3-15 characters");
    });
    it('password input is too long', () => {
        render(<MockLogin />);
        const inputUsername = screen.getByTestId(/signUserId/i);
        const inputPassword = screen.getByTestId(/signPassId/i);
        const buttonElement = screen.getByRole("button", {name: /Submit/i})
        fireEvent.change(inputUsername, { target: { value: "gilbear"} })
        fireEvent.change(inputPassword, { target: { value: "123456789123456789"} })
        fireEvent.click(buttonElement)
        const errorDiv = screen.getByTestId(/errorDiv/i);
        expect(errorDiv.textContent).toBe("Password must be between 3-15 characters");
    });
    it('passwords do not match', () => {
        render(<MockLogin />);
        const inputUsername = screen.getByTestId(/signUserId/i);
        const inputPassword = screen.getByTestId(/signPassId/i);
        const inputCopyPassword = screen.getByTestId(/signPassCopyId/i);
        const buttonElement = screen.getByRole("button", {name: /Submit/i})
        fireEvent.change(inputUsername, { target: { value: "gilbear"} })
        fireEvent.change(inputPassword, { target: { value: "123456"} })
        fireEvent.change(inputCopyPassword, { target: { value: "123"} })
        fireEvent.click(buttonElement)
        const errorDiv = screen.getByTestId(/errorDiv/i);
        expect(errorDiv.textContent).toBe("Passwords do not match");
    });
    it('Jubo name no spaces', () => {
        render(<MockLogin />);
        const inputUsername = screen.getByTestId(/signUserId/i);
        const inputPassword = screen.getByTestId(/signPassId/i);
        const inputCopyPassword = screen.getByTestId(/signPassCopyId/i);
        const buttonElement = screen.getByRole("button", {name: /Submit/i})
        fireEvent.change(inputUsername, { target: { value: "gilb ear"} })
        fireEvent.change(inputPassword, { target: { value: "123456"} })
        fireEvent.change(inputCopyPassword, { target: { value: "123456"} })
        fireEvent.click(buttonElement)
        const errorDiv = screen.getByTestId(/errorDiv/i);
        expect(errorDiv.textContent).toBe("User must have no spaces");
    });
    it('Functions after submit', async () => {
        render(<MockLogin />);
        const fetchMock = jest
        .spyOn(global, 'fetch')
        .mockImplementation(() =>
            Promise.resolve({ 
                ok: true, 
                json: () => Promise.resolve({user_identifier: '6gp0ybeuq6', user_name: 'gilbear', modified: '2021-11-20T08:54:18.727Z'}) 
            })
        )
        const inputUsername = screen.getByTestId(/signUserId/i);
        const inputPassword = screen.getByTestId(/signPassId/i);
        const inputCopyPassword = screen.getByTestId(/signPassCopyId/i);
        const buttonElement = screen.getByRole("button", {name: /Submit/i})
        fireEvent.change(inputUsername, { target: { value: "gilbear"} })
        fireEvent.change(inputPassword, { target: { value: "123456"} })
        fireEvent.change(inputCopyPassword, { target: { value: "123456"} })
        await act( async () => { 
            fireEvent.click(buttonElement) 
        });
        expect(fetchMock).toHaveBeenCalled()
        expect(JSON.parse(sessionStorage.getItem('currentUser'))).toBe('6gp0ybeuq6')
        expect(sessionStorage.getItem('logged')).toBe('true')
        expect(JSON.parse(sessionStorage.getItem('jubo_name'))).toBe('gilbear')
    });
});