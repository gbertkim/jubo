import { render, screen , fireEvent, act} from '@testing-library/react'
import Dashboard from './Dashboard';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../AuthContext';

const MockLogin = () => {
    return (
        <AuthProvider >
            <Router>
                <Dashboard />
            </Router>
        </AuthProvider>
    )
}
describe.skip('Login Component Test', () => {
    it('username input is working', async () => {
        // jest.mock('react-router-dom', () => ({
        //     ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
        //     useParams: () => ({
        //       userid: '6gp0ybeuq6'
        //     }),
        //     useRouteMatch: () => ({ url: '/admin/6gp0ybeuq6' }),
        // }));
        // jest.spyOn(Object.getPrototypeOf(window.sessionStorage), 'getItem').mockImplementation(() => {
        //     {
        //     'currentUser':'6gp0ybeuq6'
        //     }
        // })
        // const fetchMock = jest
        // .spyOn(global, 'fetch')
        // .mockImplementation(() =>
        //     Promise.resolve({ 
        //         ok: true, 
        //         json: () => Promise.resolve([
        //             {
        //                 active: true,
        //                 event_date: "2021-12-05T00:00:00.000Z",
        //                 event_name: "Portfolio",
        //                 events_creator_id: "6gp0ybeuq6",
        //                 id: 1,
        //                 modified: "2021-11-30T00:52:53.840Z"
        //             },
        //             {
        //                 active: false,
        //                 event_date: "2021-12-01T00:00:00.000Z",
        //                 event_name: "Trial Event1",
        //                 events_creator_id: "6gp0ybeuq6",
        //                 id: 2,
        //                 modified: "2021-12-03T16:46:39.732Z",
        //             }
        //         ]) 
        //     })
        // )
        // render(<MockLogin />);
        // const headerElem = await screen.findByRole("header", {name: /My Jubos/i } );
        // expect(headerElem).toBeInTheDocument();
    });
});