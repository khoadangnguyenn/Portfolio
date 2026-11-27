---
title: "Blockchain-integrated IoT system"
excerpt: "A prototype where a simulated device signs its readings, a backend verifies them, and the data hash is stored in a smart contract."
tagline: "A prototype that signs IoT readings per device, verifies them in a FastAPI backend and anchors their hashes in a Solidity contract."
collection: portfolio
when: "Aug 2025"   # first/last push month on GitHub, from _data/projects.yml
start: "2025-08"
end: "2025-08"
stack: [Python, FastAPI, Solidity, web3.py, IPFS, ECDSA]
code: "https://github.com/khoadangnguyenn/Blockchain-integrated-IoT-System"
card_summary: "IoT prototype: devices sign readings with ECDSA, a FastAPI backend verifies them, raw data goes to IPFS and its hash to a Solidity contract."
permalink: /portfolio/blockchain-iot/
---

This prototype guards IoT data against two risks: a forged reading from an impersonated device, and a reading altered on its way to storage. A central server would also be a single point of trust. The project docs frame the work around those risks and target a testnet, not mainnet.

A simulated device generates mock temperature and humidity readings and hashes them with SHA-256. It signs the hash with ECDSA on the secp256k1 curve, registers its public key and posts the payload to the backend.

The backend is a FastAPI service with one upload endpoint. It checks that the device is registered and verifies the signature. Then it adds the JSON to IPFS and writes the resulting content ID and the data hash to the chain through the web3 library.

The Solidity contract is about 296 lines. It keeps a device registry with DIDs, stores data hashes and answers integrity checks for a given IPFS hash and data hash. It also handles access grants that expire. It builds on OpenZeppelin's ownership and reentrancy-guard contracts, and its deploy script targets Polygon Amoy or a local node.

I tested the prototype on a testnet with simulated devices and did not evaluate scalability. Next steps are real IoT hardware, mainnet deployment and lower transaction cost.

<!--lang:vi-->

Nguyên mẫu này bảo vệ dữ liệu IoT trước hai rủi ro: số liệu giả gửi từ một thiết bị bị mạo danh, và số liệu bị sửa trên đường tới nơi lưu trữ. Nếu dùng một máy chủ trung tâm thì mọi niềm tin cũng dồn vào đúng một điểm đó. Tài liệu của dự án xoay quanh các rủi ro này và nhắm tới testnet, không phải mainnet.

Một thiết bị mô phỏng sinh số liệu nhiệt độ và độ ẩm giả lập, rồi băm số liệu bằng SHA-256. Thiết bị ký số mã băm bằng ECDSA trên đường cong secp256k1, đăng ký khoá công khai, rồi gửi payload lên backend.

Backend là một dịch vụ FastAPI có một endpoint duy nhất để tải dữ liệu lên. Backend kiểm tra thiết bị đã đăng ký hay chưa và xác minh chữ ký. Sau đó nó đưa bản JSON lên IPFS, rồi dùng thư viện web3 ghi content ID nhận về cùng mã băm dữ liệu lên chuỗi.

Hợp đồng Solidity dài khoảng 296 dòng. Hợp đồng giữ sổ đăng ký thiết bị kèm DID, lưu mã băm dữ liệu và trả lời yêu cầu kiểm tra toàn vẹn khi nhận một mã băm IPFS và một mã băm dữ liệu. Nó còn quản lý các quyền truy cập được cấp có thời hạn. Hợp đồng dựa trên hai hợp đồng của OpenZeppelin về quyền sở hữu và chống reentrancy, còn script triển khai nhắm tới Polygon Amoy hoặc một node cục bộ.

Mình thử nguyên mẫu trên testnet với các thiết bị mô phỏng và chưa đánh giá khả năng mở rộng. Bước tiếp theo là chạy trên phần cứng IoT thật, triển khai lên mainnet và giảm phí giao dịch.

<!--lang:ja-->

このプロトタイプは、IoTデータの2つのリスクに対処します。なりすましたデバイスから届く偽の測定値と、保存先に届くまでの途中で書き換えられた測定値です。中央サーバーを使うと、信頼がそのサーバー1か所に集中するという問題もあります。プロジェクトのドキュメントはこれらのリスクを軸にまとめられており、対象はメインネットではなくテストネットです。

シミュレートしたデバイスが温度と湿度の模擬データを生成し、SHA-256でハッシュ化します。そのハッシュにsecp256k1曲線のECDSAで署名し、公開鍵を登録したうえで、ペイロードをバックエンドに送ります。

バックエンドはFastAPIのサービスで、アップロード用のエンドポイントが1つあります。デバイスが登録済みかを確認し、署名を検証します。そのあとJSONをIPFSに追加し、得られたコンテンツIDとデータのハッシュを、web3ライブラリでチェーンに書き込みます。

Solidityのコントラクトは約296行です。DID付きのデバイス登録簿を持ち、データのハッシュを保存し、IPFSハッシュとデータハッシュを受け取って完全性をチェックします。期限付きのアクセス権の付与も扱います。OpenZeppelinの所有権管理とリエントランシーガードのコントラクトを土台にしていて、デプロイスクリプトはPolygon Amoyかローカルノードを対象にしています。

プロトタイプはテストネット上で、シミュレートしたデバイスを使って試しました。スケーラビリティは評価していません。次のステップは、実際のIoTハードウェアでの運用、メインネットへのデプロイ、トランザクションコストの削減です。
