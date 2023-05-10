# Quản lý dân cư

## Yêu cầu hệ thống

- Docker >= 20.10
- Docker compose plugin

## Các tính năng

- Client: `http://project.localhost:3000`
- Server: `http://project.localhost:3000/api/`
- Phpmyadmin: `http://phpmyadmin.localhost:3000`
- Traefik: `http://traefik.localhost:3000`

## Hướng dẫn sử dụng

Sau khi clone project về chạy câu lệnh:

```sh
make devinstall
```

Câu lệnh sẽ tạo 3 file `.env` lần lượt ở thư mục root, trong server và client, có thể custom biến môi trường ở các file này

Tiếp theo cần khởi động dự án bằng cách sử dụng:

```sh
make devup
```

\*trường hợp gặp phải lỗi: `Docker is not running.` hoặc `Cannot connect to the Docker daemon at unix:///home/<you>/.docker/desktop/docker.sock.` chạy câu lệnh sau đây ở thư mục gốc:

```sh
export DOCKER_HOST=unix:///var/run/docker.sock
```

Nếu thành công `server` sẽ chạy ở chế độ `-d` có thể truy cập theo đường dẫn: `http://project.localhost:3000/api/`

Câu lệnh để migrate database:

```sh
make devmigrate
```

Câu lệnh để seed fake data:

```sh
make devfresh
```

Có thể truy cập `phpmyadmin` để xem dững liệu trong database theo đường dẫn: `http://phpmyadmin.localhost:3000` với credential mặc định của DB là:

```
DB_USERNAME=sail
DB_PASSWORD=password
```

Để khởi chạy `client` chạy câu lệnh:

```sh
make devrun
```

Có thể truy cập ứng dụng theo đường dẫn
`http://project.localhost:3000`

Tắt ứng dụng:

```sh
make devdown
```

Xóa tất cả docker images, container:

```sh
make devclean
```
