import './../matchMedia'
import {act, render, screen, waitFor} from "@testing-library/react";
import App from "./App";
import * as reduxHooks from 'react-redux'
import {MemoryRouter} from "react-router-dom";

jest.mock('react-redux')

describe('app', () => {
    test('should create app',  async () => {

        jest.spyOn(reduxHooks, 'useSelector').mockReturnValue([])
        jest.spyOn(reduxHooks, 'useDispatch').mockReturnValue(jest.fn())

        const component =  render(
            <MemoryRouter initialEntries={['/']}>
                <App/>
            </MemoryRouter>
        )
        await waitFor(() => {
            expect(component).toMatchSnapshot()
        })
    })
})

