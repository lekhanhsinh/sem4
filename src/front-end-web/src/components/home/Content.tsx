import React from 'react';
import content1 from '../img/content1.jpg';
import content2 from '../img/content2.jpg';
import content3 from '../img/content3.jpg';
import content4 from '../img/content4.jpg';
import content5 from '../img/content5.jpg';
import content6 from '../img/content6.jpg';



class Content extends React.Component {
    render() {

        return (
            <div className="container">
                <div className="content py-5" >
                    <h5>LÝ DO WEBSITE CỦA CHÚNG TÔI LÀ ĐỊA ĐIỂM QUEN THUỘC ĐƯỢC KHÁCH HÀNG TÌM TỚI </h5>
                    <div className="container">
                        <div className="row py-4">
                            <div className="col-md-6">
                                <img src={content1} alt="" />
                                <h5>Màu ảnh tinh tế</h5>
                                <p>Printaphy sẽ khiến bạn trầm trồ ngạc nhiên với chất lượng hình ảnh vô cùng nghệ thuật và đẹp mắt.
                                     Ảnh in không phai màu và không thấm nước.</p>
                            </div>
                            <div className="col-md-6">
                                <img src={content2} alt="" />
                                <h5>Không quy định số lượng ảnh in tối thiểu</h5>
                                <p>Bạn chỉ cần in số lượng ít và giao tận nơi trong thời gian ngắn. 
                                    Chúng tôi không quy định số lượng ảnh in tối thiểu,
                                     tất cả vì sự thuận tiện của khách hàng.</p>
                            </div>
                        </div>
                        <div className="row py-4">
                            <div className="col-md-6">
                                <img src={content3} alt="" />
                                <h5>Giao hàng siêu nhanh toàn quốc</h5>
                                <p>Chúng tôi có dịch vụ giao hàng chuyển phát nhanh trên toàn quốc nữa đấy. Dù đơn bạn có giá trị nhỏ hay lơn,
                                     Chúng tôi nhận chuyển phát.
                                    Bạn có thể thanh toán bằng chuyển khoản ngân hàng hoặc thanh toán trực tiếp (COD) khi nhận sản phẩm.</p>
                            </div>
                            <div className="col-md-6">
                                <img src={content4} alt="" />
                                <h5>Đặt hàng trực tuyến</h5>
                                <p>Đã qua rồi việc bạn phải đem hình ra tiệm để rửa. Chỉ cần vài cú click chuột,
                                     ảnh xinh ảnh đẹp đã sẵn sàng được giao tới bạn.</p>
                            </div>
                        </div>
                        <div className="row py-4">
                            <div className="col-md-6">
                                <img src={content5} alt="" />
                                <h5>Thông tin khách hàng được bảo mật</h5>
                                <p>Bạn đang muốn in những tấm ảnh có tính riêng tư cao?
                                    Chúng tôi có trách nhiệm bảo vệ quyền riêng tư về thông tin và ảnh của khách hàng.
                                    Chúng tôi sẽ không cung cấp thông tin của khách hàng cho bất kỳ đơn vị thứ 3.</p>
                            </div>
                            <div className="col-md-6">
                                <img src={content6} alt="" />
                                <h5>Hỗ trợ trực tuyến nhanh chóng</h5>
                                <p>Chúng tôi cam kết phản hồi sớm nhất cho các bạn.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;
