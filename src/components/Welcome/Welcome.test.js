import { render, screen } from '@testing-library/react'
import Welcome from './Welcome';
import { Route, BrowserRouter as Router } from 'react-router-dom';

const MockWelcome = () => {
    return (
    <Router>
        <Welcome />
    </Router>)
}
describe.skip('Welcome Component Test', () => {
    it('renders create link', () => {
        render(<MockWelcome />);
        const linkElement = screen.getByText(/Create/i);
        expect(linkElement).toBeInTheDocument();
    });
    it('renders log in link', () => {
        render(<MockWelcome />);
        const linkElement = screen.getByText(/Log In/i);
        expect(linkElement).toBeInTheDocument();
    });
});