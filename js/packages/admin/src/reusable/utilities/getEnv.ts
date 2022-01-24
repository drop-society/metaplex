export const Production = 'prod';
export const Beta = 'beta';
export const Alpha = 'alpha';
export const Development = 'dev';

export const allEnv = [Production, Beta, Development];

export const getEnv = (): string => {
  if (
    typeof window !== `undefined` &&
    window &&
    window.location &&
    window.location.host
  ) {
    const env = window.location.host.split('.')[1];
    return allEnv.includes(env) ? env : Development;
  }

  return Development;
};

export const getEnvBetaToProd = (): string => {
  const env = getEnv();
  return env === Beta ? Production : env;
};
