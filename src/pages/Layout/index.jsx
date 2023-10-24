import { Outlet } from 'react-router-dom';
import SideBarComponent from '../../components/Sidebar';

function LayoutComponent() {
    return (
        <div className="layout">
          <SideBarComponent />
          <div className="main__layout">
            <div className="content">
              <Outlet />
            </div>
          </div>
        </div>
      );
}

export default LayoutComponent