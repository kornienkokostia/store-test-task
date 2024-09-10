import './loader.scss';

type LoaderTheme = 'big' | 'small';

interface LoaderProps {
  theme?: LoaderTheme;
}

export const Loader = ({ theme = 'big' }: LoaderProps) => (
  <div className={`spinner ${theme}`}>
    <div className={'spinner-blade'} />
    <div className={'spinner-blade'} />
    <div className={'spinner-blade'} />
    <div className={'spinner-blade'} />
    <div className={'spinner-blade'} />
    <div className={'spinner-blade'} />
    <div className={'spinner-blade'} />
    <div className={'spinner-blade'} />
    <div className={'spinner-blade'} />
    <div className={'spinner-blade'} />
    <div className={'spinner-blade'} />
    <div className={'spinner-blade'} />
  </div>
);
