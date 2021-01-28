import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Components
import Header from '../Header/Header';
import HomePage from '../../pages/HomePage/HomePage';
import LoginPage from '../../pages/LoginPage.jsx/LoginPage';
import RegisterPage from '../../pages/RegisterPage.jsx/RegisterPage';
import AboutPage from '../../pages/About/About';

// Config
import { HOME_PAGE, 
        LOGIN_PAGE, 
        REGISTER_PAGE,
        ABOUT_PAGE,
        ADMIN_PAGE,
        EDIT_ITEM_PAGE,
        VIEW_ITEMS_PAGE,
        VIEW_ADMIN_ITEMS_PAGE,
        VIEW_ITEM_PAGE,
        VIEW_AUTHORS_PAGE,
        VIEW_ADMINS_PAGE,
        CHANGE_PASSWORD_PAGE} from '../../config/routes';

import styles from './navigation.module.css';
import { UserSessionProvider } from '../../contexts/userContext';
import AdminPage from '../../pages/Admin/AddItemPage';
import ItemsListPage from '../../pages/Admin/ItemsListPage';
import EditItemPage from '../../pages/Admin/EditItemPage';
import AdminItemsListPage from '../../pages/Admin/AdminItemsListPage';
import ViewItemPage from '../../pages/Admin/ViewItemPage';
import AuthorsListPage from '../../pages/Admin/AuthorsListPage';
import { outerTheme } from '../../styles/outerThemeProvider';
import { MuiThemeProvider } from '@material-ui/core';
import { ItemsListContextProvider } from '../../contexts/itemsListContext';
import { AuthorsListContextProvider } from '../../contexts/authorsListContext';
import { AdminsListContextProvider } from '../../contexts/adminsListContext';
import AdminsListPage from '../../pages/Admin/AdminsListPage';
import ChangePasswordPage from '../../pages/LoginPage.jsx/ChangePasswordPage';
import Footer from '../Footer/Footer';



const Navigation = () => {

  return (
      <UserSessionProvider>
        <ItemsListContextProvider>
          <AuthorsListContextProvider>
          <AdminsListContextProvider>
            <BrowserRouter>
              <Header/>
                <MuiThemeProvider theme={outerTheme}>
                  <div className={styles.container}>
                    <Switch>
                        <Route path={HOME_PAGE} exact component={HomePage}/>
                        <Route path={ADMIN_PAGE} exact component={AdminPage}/>
                        <Route path={VIEW_ITEMS_PAGE} exact component={ItemsListPage}/>
                        <Route path={VIEW_ADMIN_ITEMS_PAGE} exact component={AdminItemsListPage}/>
                        <Route path={EDIT_ITEM_PAGE.concat(":item").concat("/").concat(":page")} exact component={EditItemPage}/>
                        <Route path={VIEW_ITEM_PAGE.concat(":item").concat("/").concat(":page")} exact component={ViewItemPage}/>
                        <Route path={VIEW_AUTHORS_PAGE} exact component={AuthorsListPage}/>
                        <Route path={VIEW_ADMINS_PAGE} exact component={AdminsListPage}/>
                        <Route path={ABOUT_PAGE} exact component={AboutPage} />
                        <Route path={LOGIN_PAGE} exact component={LoginPage} /> 
                        <Route path={REGISTER_PAGE} exact component={RegisterPage} />
                        <Route path={CHANGE_PASSWORD_PAGE} exact component={ChangePasswordPage} />
                    </Switch>
                  </div>
                </MuiThemeProvider>
                <Footer/>
              </BrowserRouter>
              </AdminsListContextProvider>
            </AuthorsListContextProvider> 
          </ItemsListContextProvider>
        </UserSessionProvider>
  );
}

export default Navigation;
