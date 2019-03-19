import * as React from 'react';
import { connect } from 'react-redux';
import posed from 'react-pose';
import { Dispatch } from 'redux';
import classnames from 'classnames';

import { Toast } from './types';
import { removeToast } from './actions';

interface GivenToastItemProps {
  item: Toast;
}

interface GeneratedToastItemProps {
  onTimeout: () => void;
}

const toastProps = {
  enter: { opacity: 1, y: 0, transition: { duration: 300 } },
  exit: { opacity: 0, y: -20, transition: { duration: 300 } },
};

const AnimatedToast = posed.div(toastProps);

const ToastItem = ({
  item,
  onTimeout,
  ...props
}: GivenToastItemProps & GeneratedToastItemProps): JSX.Element => {
  React.useEffect(() => {
    /*
    Automatically clear the toast item but resets timer on item update
     */
    const handler = setTimeout(() => {
      onTimeout();
    }, 3000);

    return () => clearTimeout(handler);
  }, [item]);

  return (
    <AnimatedToast
      {...props}
      data-testid='toast__item'
      className={classnames(
        'toasts__toast_item',
        `toasts__toast_item-${item.type}`,
      )}
      dangerouslySetInnerHTML={{ __html: item.content }}
    />
  );
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: { item: Toast },
): GeneratedToastItemProps => ({
  onTimeout: () => dispatch(removeToast(ownProps.item._id)),
});

export default connect<{}, GeneratedToastItemProps, GivenToastItemProps>(
  null,
  mapDispatchToProps,
)(ToastItem);
