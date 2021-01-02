import { Layout } from 'antd';
import LayoutClassNavbar from './LayoutClassNavbar';
import LayoutNavbar from './LayoutNavbar';

const { Header, Footer, Sider, Content } = Layout;

function TemplateLayout(props) {
    return (
        <Layout>
            {/* <LayoutNavbar title="My React App" /> */}
            <LayoutClassNavbar isLoggedIn={props.isLoggedIn} />
            {props.children}
        </Layout>
    )
}

export default TemplateLayout;