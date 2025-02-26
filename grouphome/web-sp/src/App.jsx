import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import { LoginQrReading } from './pages/LoginQrReading';
import { LoginFirstTimePassCode } from './pages/LoginFirstTimePassCode';
import { LoginPassCode } from './pages/LoginPassCode';
import { LoginPassCodeForget } from './pages/LoginPassCodeForget';
import { LoginEmailPassword } from './pages/LoginEmailPassword';
import { LoginPasswordForget } from './pages/LoginPasswordForget';
import { LoginPasswordReset } from './pages/LoginPasswordReset';
import { Top } from './pages/Top';
import { InputGroupHomeDate } from './pages/InputGroupHomeDate';
import { InputWakeTime } from './pages/InputWakeTime';
import { InputVitals } from './pages/InputVitals';
import { InputMealTop } from './pages/InputMealTop';
import { InputMealDetails } from './pages/InputMealDetails';
import { InputMedicines } from './pages/InputMedicines';
import { InputDayCare } from './pages/InputDayCare';
import { InputBathing } from './pages/InputBathing';
import { InputBedtime } from './pages/InputBedtime';
import { InputDaySupport } from './pages/InputDaySupport';
import { InputDayState } from './pages/InputDayState';
import { InputHospitalHome } from './pages/InputHospitalHome';
import { InputRemarks } from './pages/InputRemarks';
import { InputNightPatrol } from './pages/InputNightPatrol';
import { InputByUser } from './pages/InputByUser';
import { InputUserInitialDataTop } from './pages/InputUserInitialDataTop';
import { InputUserInitialDataDetail } from './pages/InputUserInitialDataDetail';
import { InputDayStateTemplate } from './pages/InputDayStateTemplate';

export const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="ly_container">
        <Routes>
          <Route path="/" element={ <LoginQrReading /> } />
          <Route path="/loginFirstTimePassCode" element={ <LoginFirstTimePassCode /> } />
          <Route path="/loginPassCode" element={ <LoginPassCode /> } />
          <Route path="/loginPassCodeForget" element={ <LoginPassCodeForget /> } />
          <Route path="/loginEmailPassword" element={ <LoginEmailPassword /> } />
          <Route path="/loginPasswordForget" element={ <LoginPasswordForget /> } />
          <Route path="/loginPasswordReset" element={ <LoginPasswordReset /> } />
          <Route path="/top" element={ <Top/> } />
          <Route path="/inputGroupHomeDate" element={ <InputGroupHomeDate /> } />
          <Route path="/inputWakeTime" element={ <InputWakeTime /> } />
          <Route path="/inputVitals" element={ <InputVitals /> } />
          <Route path="/inputMealTop" element={ <InputMealTop /> } />
          <Route path="/inputMealDetails" element={ <InputMealDetails /> } />
          <Route path="/inputMedicines" element={ <InputMedicines /> } />
          <Route path="/inputDayCare" element={ <InputDayCare /> } />
          <Route path="/inputBathing" element={ <InputBathing /> } />
          <Route path="/inputBedtime" element={ <InputBedtime /> } />
          <Route path="/inputDaySupport" element={ <InputDaySupport /> } />
          <Route path="/inputDayState" element={ <InputDayState /> } />
          <Route path="/inputHospitalHome" element={ <InputHospitalHome /> } />
          <Route path="/inputRemarks" element={ <InputRemarks /> } />
          <Route path="/inputNightPatrol" element={ <InputNightPatrol />} />
          <Route path="/inputByUser" element={ <InputByUser /> } />
          <Route path="/inputUserInitialDataTop" element={ <InputUserInitialDataTop /> } />
          <Route path="/inputUserInitialDataDetail" element={ <InputUserInitialDataDetail /> } />
          <Route path="/inputDayStateTemplate" element={ <InputDayStateTemplate /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
