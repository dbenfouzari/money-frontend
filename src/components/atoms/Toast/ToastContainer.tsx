import * as React from 'react';
import { connect } from 'react-redux';
import { PoseGroup } from 'react-pose';

import './Toasts.css';
import { getToasts } from './selectors';
import { Toast } from './types';
import ToastItem from './ToastItem';

interface ToastContainerProps {
  toasts: Toast[];
}

const ToastContainer = ({ toasts }: ToastContainerProps): JSX.Element => (
  <div className='toasts__toast_wrapper'>
    <PoseGroup animateOnMount={true} flipMove={false}>
      {toasts.map(toastItem => (
        <ToastItem key={toastItem._id} item={toastItem} />
      ))}
    </PoseGroup>
  </div>
);

const mapStateToProps = (state: any): ToastContainerProps => ({
  toasts: getToasts(state),
});

export default connect(mapStateToProps)(ToastContainer);
