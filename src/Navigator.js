import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

//import AuthOrApp from './screens/AuthOrApp'
//import Menu from './screens/Menu'
import Agenda from './screens/Agenda'
import Auth from './screens/Auth'

const menuRoutes = {
    Today: {
        name: 'Today',
        screen: props => <Agenda title='Hoje' daysAhead={0} {...props} />, // -- A tela chamada será este JSX
        navigationOptions: {
            // -- Título que deve aparecer no Drawer Menu
            title: 'Hoje'
        }
    },
    Tomorrow: {
        name: 'Tomorrow',
        screen: props => <Agenda title='Amanhã' daysAhead={1} {...props} />, // -- A tela chamada será este JSX
        navigationOptions: {
            // -- Título que deve aparecer no Drawer Menu
            title: 'Amanhã'
        }
    },
    Week: {
        name: 'Week',
        screen: props => <Agenda title='Semana' daysAhead={7} {...props} />, // -- A tela chamada será este JSX
        navigationOptions: {
            // -- Título que deve aparecer no Drawer Menu
            title: 'Semana'
        }
    },
    Month: {
        name: 'Month',
        screen: props => <Agenda title='Mês' daysAhead={30} {...props} />, // -- A tela chamada será este JSX
        navigationOptions: {
            // -- Título que deve aparecer no Drawer Menu
            title: 'Mês'
        }
    }
};

const menuNavigator = createDrawerNavigator(menuRoutes);

const mainRoutes = {
    Auth: {
        name: 'Auth',
        screen: Auth
    },
    Home: {
        name: 'Home',
        screen: menuNavigator
    },
};

const nainNavigator = createSwitchNavigator(mainRoutes, {
    initialRouteName: 'Auth', // -- Rota que será carregada por padrão
});

export default createAppContainer(nainNavigator);