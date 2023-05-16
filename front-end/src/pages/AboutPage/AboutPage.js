import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Accordion, AccordionSummary , AccordionDetails , Typography, Container, Box } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AboutPage = () => {
  return (
    <Layout>
      <Container maxWidth="lg" >
        <Box sx={{margin: '50px 0'}}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant='h5' sx={{color: '#cf881d'}}>Giới thiệu</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box mb={6}>
              <Typography component="p" mt={2} sx={{color: "#5a5a5a", textAlign: "justify", lineHeight: 2}}>
                Cleaning Service là website về ngành giúp việc nhà ở Việt Nam. Chúng
                tôi cung cấp đa dịch vụ tiện ích như: dọn dẹp nhà, nấu ăn, đi chợ, …
                tại Việt Nam. Thông qua website đặt lịch dịch vụ dành cho khách hàng và nhận
                việc của cộng tác viên Cleaning Service, khách hàng và cộng tác viên
                có thể chủ động tìm người làm phù hợp với công việc yêu cầu và nhận việc trực tiếp trên website.
              </Typography>
            </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography  variant='h5' sx={{color: '#cf881d'}}>Chính sách bảo mật</Typography>
            </AccordionSummary>
            <AccordionDetails>
               <Box>
                    <Typography  component="h2" sx={{color: "#000", fontWeight: 'bold', fontSize: '18px'}} >
                                  Thu thập thông tin cá nhân
                    </Typography>
                    <Typography   component="p" mt={2} sx={{color: "#5a5a5a", textAlign: "justify", lineHeight: 2}}  >
                                  Thông tin Cá nhân là thông tin về bạn mang tính nhận dạng, bao gồm nhưng không giới hạn tên, số chứng minh thư nhân dân, số giấy khai sinh, số hộ chiếu, quốc tịch, địa chỉ, số điện thoại, số fax, thông tin ngân hàng, thông tin thẻ tín dụng, dân tộc, giới tính, ngày sinh, tình trạng hôn nhân, tình trạng cư trú, nền tảng giáo dục, tình trạng tài chính, sở thích cá nhân, địa chỉ thư điện tử (email) của bạn, nghề nghiệp, định danh của bạn trong Cleaning Servive, thông tin của bạn trong Cleaning Servive, ngành làm việc của bạn, bất kỳ thông tin nào về bạn mà bạn đã cung cấp cho Cleaning Servive trong các đơn đăng ký hoặc bất kỳ đơn tương tự nào và/hoặc bất kỳ thông tin nào về bạn đã được hoặc sẽ được Cleaning Servive thu thập, lưu trữ, sử dụng và xử lý theo thời gian và bao gồm các thông tin cá nhân nhạy cảm như các dữ liệu về sức khỏe, tôn giáo hoặc tín ngưỡng tương tự khác.
                    </Typography>
                </Box>
                <Box mt={6}>
                    <Typography component="h2" sx={{color: "#000", fontWeight: 'bold', fontSize: '18px'}} >
                                  Mục đích sử dụng thông tin
                    </Typography>
                    <Typography  component="p" mt={2} sx={{color: "#5a5a5a", textAlign: "justify", lineHeight: 2}} >
                                  Để trả lời các câu hỏi, bình luận và phản hồi của người dùng; Để phục vụ mục đích quản lý nội bộ như kiểm toán, phân tích dữ liệu, lưu trữ cơ sở dữ liệu; Để phục vụ mục đích phát hiện, ngăn chặn và truy tố tội phạm; Để giúp Cleaning Servive tuân thủ các nghĩa vụ theo quy định của pháp luật;
                    </Typography>
                </Box>
                <Box mt={6} mb={6}>
                    <Typography  component="h2" sx={{color: "#000", fontWeight: 'bold', fontSize: '18px'}} >
                                 Thời gian lưu trữ thông tin
                    </Typography>
                    <Typography   component="p" mt={2} sx={{color: "#5a5a5a", textAlign: "justify", lineHeight: 2}} >
                                  Dữ liệu cá nhân của người dùng sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ hoặc tự người dùng đăng nhập và thực hiện hủy bỏ. Còn lại trong mọi trường hợp thông tin cá nhân của người dùng sẽ được bảo mật trên máy chủ của Cleaning Servive.
                    </Typography>
                </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
            <Typography  variant='h5' sx={{color: '#cf881d'}}>Điều khoản sử dụng</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box >
                    <Typography  component="h2" sx={{color: "#000", fontWeight: 'bold', fontSize: '18px'}} >
                                  Tài khoản người dùng
                    </Typography>
                    <Typography  component="p" mt={2} sx={{color: "#5a5a5a", textAlign: "justify", lineHeight: 2}} >
                                  Để sử dụng hầu hết các khía cạnh của Dịch vụ, bạn phải đăng ký và duy trì hoạt động một tài khoản Dịch vụ người dùng cá nhân (“Tài khoản”). Bạn phải đủ 18 tuổi trở lên, hoặc đủ tuổi trưởng thành theo pháp lý trong khu vực tài phán của mình (nếu tuổi trưởng thành khác 18 tuổi), để có được một Tài khoản. Việc đăng ký tài khoản yêu cầu bạn phải gửi cho Cleaning Servive các thông tin cá nhân nhất định, chẳng hạn như tên, địa chỉ, số điện thoại di động của bạn và tuổi tác,... Bạn đồng ý duy trì thông tin chính xác, đầy đủ và cập nhật trong Tài khoản của bạn. Việc bạn không duy trì thông tin Tài khoản chính xác, đầy đủ và cập nhật, có thể dẫn đến việc bạn sẽ không có quyền truy cập và sử dụng Dịch vụ hoặc chấm dứt Thỏa thuận này giữa bạn và Cleaning Servive. Bạn chịu trách nhiệm đối với tất cả các hoạt động diễn ra trong Tài khoản của bạn, và bạn đồng ý duy trì tính an ninh và bảo mật của tên người dùng và mật khẩu Tài khoản của bạn tại mọi thời điểm. 
                    </Typography>
                </Box>
                <Box mt={6}>
                    <Typography  component="h2" sx={{color: "#000", fontWeight: 'bold', fontSize: '18px'}} >
                                  Yêu cầu và ứng xử của người dùng
                    </Typography>
                    <Typography  component="p" mt={2} sx={{color: "#5a5a5a", textAlign: "justify", lineHeight: 2}} >
                                 Các dịch vụ không được cấp cho người dùng dưới 18 tuổi. Bạn không được chuyển nhượng hoặc chuyển giao Tài khoản của mình cho bất kỳ cá nhân hoặc thực thể pháp lý nào khác. Bạn đồng ý tuân thủ tất cả các luật áp dụng khi sử dụng các Dịch vụ, và bạn chỉ có thể sử dụng Dịch vụ cho các mục đích hợp pháp. Khi sử dụng các dịch vụ, bạn không được gây phiền toái, khó chịu, bất tiện, hoặc thiệt hại tài sản, cho các Nhà cung cấp Bên Thứ ba hoặc bất kỳ bên nào khác. Trong một số trường hợp bạn có thể được yêu cầu cung cấp giấy tờ chứng minh quyền truy cập hoặc sử dụng dịch vụ, và bạn đồng ý rằng bạn có thể bị từ chối truy cập hoặc sử dụng Dịch vụ nếu bạn từ chối cung cấp giấy tờ chứng minh.
                    </Typography>
                </Box>
                <Box mt={6} mb={6}>
                    <Typography  component="h2" sx={{color: "#000", fontWeight: 'bold', fontSize: '18px'}} >
                                 Truy cập mạng và thiết bị
                    </Typography>
                    <Typography  component="p" mt={2} sx={{color: "#5a5a5a", textAlign: "justify", lineHeight: 2}} >
                                  Bạn chịu trách nhiệm về việc truy cập mạng dữ liệu cần thiết để sử dụng các Dịch vụ. Mạng dữ liệu di động của bạn và mức phí nhắn tin và có thể áp dụng nếu bạn truy cập hoặc sử dụng các Dịch vụ từ một thiết bị không dây được kích hoạt và bạn phải chịu trách nhiệm về mức giá và phí này. Cleaning Servive không đảm bảo rằng các Dịch vụ, hoặc bất kỳ phần nào trong đó, sẽ hoạt động trên bất kỳ phần cứng hoặc các thiết bị cụ thể nào. Ngoài ra, các Dịch vụ có thể bị trục trặc và chậm trễ vốn thường gặp trong việc sử dụng Internet và các phương tiện liên lạc điện tử.
                    </Typography>
                </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Container>
    </Layout>
  )
}

export default AboutPage;