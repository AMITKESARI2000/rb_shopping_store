import BannerZero from './banner-0.jpg';
import BannerOne from './banner-1.jpg';
import BannerTwo from './banner-2.jpg';
import BannerThree from './banner-3.png';

function BannerIncidator(props) {
    return (
        <button
            type="button"
            data-bs-target="#bannerIndicators"
            data-bs-slide-to={props.index}
            className={props.active ? 'active' : ''}
            aria-current={props.active}
        />
    );
}

function BannerImage(props) {
    return (
        <div
            className={'carousel-item ' + (props.active ? 'active' : '')}
            data-bs-interval="5000"
        >
            <div
                className="ratio"
                style={{
                    '--bs-aspect-ratio': '50%',
                    maxHeight: '460px',
                }}
            >
                <img
                    className="d-block w-100 h-100 bg-dark cover"
                    alt=""
                    src={props.image}
                />
            </div>
            <div
                className="carousel-caption d-none d-lg-block"
                style={{ color: 'cream', backgroundColor: 'rgb(11,11,11,0.5)' }}
            >
                <h4>Banner Header</h4>
                <h6>Some representative placeholder content for the banner.</h6>
            </div>
        </div>
    );
}

function Banner() {
    return (
        <div
            id="bannerIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
            style={{ marginTop: '56px' }}
        >
            <div className="carousel-indicators">
                <BannerIncidator index="0" />
                <BannerIncidator index="1" />
                <BannerIncidator index="2" active={true} />
                <BannerIncidator index="3" />
            </div>
            <div className="carousel-inner">
                <BannerImage image={BannerZero} />
                <BannerImage image={BannerOne} />
                <BannerImage image={BannerTwo} active={true} />
                <BannerImage image={BannerThree} />
            </div>
        </div>
    );
}

export default Banner;
