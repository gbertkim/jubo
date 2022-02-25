import { render, screen , fireEvent, act} from '@testing-library/react'
import Login from './Login';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../AuthContext';

const MockLogin = () => {
    return (
        <AuthProvider >
            <Router>
                <Login />
            </Router>
        </AuthProvider>
    )
}
describe.skip('Login Component Test', () => {
    it('username input is working', () => {
        render(<MockLogin />);
        const inputElement = screen.getByTestId(/usernameId/i);
        fireEvent.change(inputElement, { target: { value: "gilbear"} })
        expect(inputElement.value).toBe("gilbear");
    });
    it('password input is working', () => {
        render(<MockLogin />);
        const inputElement = screen.getByTestId(/passwordId/i);
        fireEvent.change(inputElement, { target: { value: "portfolio"} })
        expect(inputElement.value).toBe("portfolio");
    });
    it('username input is too short', () => {
        render(<MockLogin />);
        const inputElement = screen.getByTestId(/usernameId/i);
        const buttonElement = screen.getByRole("button", {name: /Log In/i})
        fireEvent.change(inputElement, { target: { value: "gi"} })
        fireEvent.click(buttonElement)
        const errorDiv = screen.getByTestId(/errorDiv/i);
        expect(errorDiv.textContent).toBe("Username must be between 3-15 characters");
    });
    it('username input is too long', () => {
        render(<MockLogin />);
        const inputElement = screen.getByTestId(/usernameId/i);
        const buttonElement = screen.getByRole("button", {name: /Log In/i})
        fireEvent.change(inputElement, { target: { value: "gilbeargilbeargilbear"} })
        fireEvent.click(buttonElement)
        const errorDiv = screen.getByTestId(/errorDiv/i);
        expect(errorDiv.textContent).toBe("Username must be between 3-15 characters");
    });
    it('password input is too short', () => {
        render(<MockLogin />);
        const inputUsername = screen.getByTestId(/usernameId/i);
        const inputPassword = screen.getByTestId(/passwordId/i);
        const buttonElement = screen.getByRole("button", {name: /Log In/i})
        fireEvent.change(inputUsername, { target: { value: "gilbear"} })
        fireEvent.change(inputPassword, { target: { value: "12"} })
        fireEvent.click(buttonElement)
        const errorDiv = screen.getByTestId(/errorDiv/i);
        expect(errorDiv.textContent).toBe("Password must be between 3-15 characters");
    });
    it('password input is too long', () => {
        render(<MockLogin />);
        const inputUsername = screen.getByTestId(/usernameId/i);
        const inputPassword = screen.getByTestId(/passwordId/i);
        const buttonElement = screen.getByRole("button", {name: /Log In/i})
        fireEvent.change(inputUsername, { target: { value: "gilbear"} })
        fireEvent.change(inputPassword, { target: { value: "123456789123456789"} })
        fireEvent.click(buttonElement)
        const errorDiv = screen.getByTestId(/errorDiv/i);
        expect(errorDiv.textContent).toBe("Password must be between 3-15 characters");
    });
    it('context and session storage functions after submit', async () => {
        render(<MockLogin />)
        const fetchMock = jest
            .spyOn(global, 'fetch')
            .mockImplementation(() =>
                Promise.resolve({ 
                    ok: true, 
                    json: () => Promise.resolve({user_identifier: '6gp0ybeuq6', user_name: 'gilbear', modified: '2021-11-20T08:54:18.727Z'}) 
                })
            )
        const inputUsername = screen.getByTestId(/usernameId/i);
        const inputPassword = screen.getByTestId(/passwordId/i);
        const buttonElement = screen.getByRole("button", {name: /Log In/i})
        fireEvent.change(inputUsername, { target: { value: "gilbear"} })
        fireEvent.change(inputPassword, { target: { value: "portfolio"} })
        await act( async () => { 
            fireEvent.click(buttonElement) 
        });
        expect(fetchMock).toHaveBeenCalledWith(
            "https://nameless-island-64548.herokuapp.com/api/accounts/check", {"body": "{\"user_name\":\"gilbear\",\"user_pass\":\"portfolio\"}", "headers": {"content-type": "application/json"}, "method": "POST"}
        )
        expect(JSON.parse(sessionStorage.getItem('currentUser'))).toBe('6gp0ybeuq6')
        expect(sessionStorage.getItem('logged')).toBe('true')
        expect(JSON.parse(sessionStorage.getItem('jubo_name'))).toBe('gilbear')
    });
});