import React from 'react';

import styles from './ErrorText.module.scss';

const ErrorText = ({ error }: { error: string }) => (<div className={styles.errorText}>{error}</div>)

export default ErrorText;