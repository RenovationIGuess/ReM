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
make devup
```

Câu lệnh sẽ tạo file `.env` ở thư mục root bao gồm các biến môi trường về domain và database có thể custom chúng bằng cách chỉnh sửa file này

Cài đặt các dependencies:

```sh
make devinstall
```

Câu lệnh để migrate database:

```sh
make devmigrate
```

Câu lệnh để seed fake data:

```sh
make devfresh
```

`server` sẽ được khởi chạy ở chế độ `--detached` có thể truy cập theo đường dẫn `http://project.localhost:3000/api/`
<br>
<br>

Khởi chạy dự án:

```sh
make devrun
```

Có thể truy cập giao diện người dùng `client` theo đường dẫn `http://project.localhost:3000`
<br>
<br>
Có thể truy cập `phpmyadmin` để xem dữ liệu trong database theo đường dẫn: `http://phpmyadmin.localhost:3000` với credential mặc định của DB là:

```
DB_USERNAME=root
DB_PASSWORD=admin
```

Tắt ứng dụng:

```sh
make devdown
```

Xóa tất cả docker images, container:

```sh
make devclean
```

## Lỗi có thể gặp

Lỗi: `Docker is not running.` hoặc `Cannot connect to the Docker daemon at unix:///home/<you>/.docker/desktop/docker.sock.` chạy câu lệnh sau đây ở thư mục gốc:

```sh
export DOCKER_HOST=unix:///var/run/docker.sock
```

Lỗi: `The stream or file "/storage/logs/laravel.log" could not be opened` chạy câu lệnh sau đây ở thư mục `server`:

```sh
sudo chmod -R ugo+rw storage
```
