const { mount } = require("enzyme")
const { MemoryRouter } = require("react-router-dom")
const { AuthContext } = require("../../auth/authContext")
const { DashboardRoutes } = require("../../routers/DashboardRoutes")



describe('Pruebas en DashboardRoutes', () => { 

    const contextValue = {
        user: {
            logged: true,
            name: 'John'
        }
    }


    test('debe mostrarse correctamente - Marvel', () => { 
        
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={ ['/'] }>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        //console.log(wrapper.html());

        expect(wrapper).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe('John');

     })

    test('debe mostrarse correctamente - Dc', () => { 
        
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={ ['/dc'] }>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        //console.log(wrapper.html());

        expect(wrapper).toMatchSnapshot();
        expect( wrapper.find('h1').text().trim() ).toBe('DC Screen');

     })

 })