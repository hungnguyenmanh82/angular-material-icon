/**
 * Circular Structure: là child Object trỏ tới Parent Object
 * Khi convert Circular Object sang Json sẽ bị báo lỗi
 * => ko đc dùng Pipe Json
 * => ko đc dùng JSON.stringify()
 */
export class ExtendNode {
  /**
   * để hiển thị trên tree view (dùng cho router-link url => HashMap)
   * name unique
   * Lúc lấy dữ liệu từ Server về chỉ có 3 properties này thôi
   */
  name!: string;
  data?: any; // data của Node tùy bài toán cụ thể
  children?: ExtendNode[];
  //=============================================================
  //các properties thêm vào cho mục đích giao diện và performance
  /**
   * nếu = true thì sẽ highlight nó và Parent của nó
   */
  isError: boolean = false;
  /**
   *
   */
  isFolder?: boolean;
  /**
   * + chỗ này nếu dùng Circular Structure thì sẽ ko dùng đc JSON.stringify() hoặc JSON Pipe
   * + vì thế đổi sang dùng name unique và dùng HashMap để tìm kiếm parent Node
   */
  // parent?: ExtendNode;
  parent?: string; // lấy name unique

  /**
   * nếu ko có thì khởi tạo mặc định
   */
  constructor(inode: IExtendNode) {
    this.name = inode.name;
    this.data = inode.data;
  }

  /**
   * + 1Node có lỗi khi các child Node có lỗi
   * + nếu nó là leafNode và ko phải folder thì chính nó có lỗi.
   * + Ta cần recursive update các childNode trc khi update chính nó
   * + Tránh gọi hàm này nhiều lần. Chỉ gọi hàm này khi có thay đổi toàn bộ
   * (khi có thay đổi ở bộ phận dùng hàm này sẽ ko tối ưu)
   * + ở UI nên dùng this.isError thay vì gọi hàm này để tăng performance
   */
  public updateNodeError(): boolean {
    let isError: boolean = false;

    //folder có thể ko có children (folder rỗng)
    if (this.children) {
      for (let childNode of this.children) {
        if (childNode.updateNodeError()) {
          isError = true;
        }
      }
    }

    if (this.isFolder) {
      this.isError = isError; // update
      return isError; //folder: lỗi khi 1 trong childNode lỗi
    } else {
      return this.isError; // file: là LeafNode
    }
  }

  /**
   * Giả định các ParentNode là folder
   * Leaf Node = file cho nó dễ => nếu 1 file của folder có lỗi thì folder sẽ có lỗi
   * File và Folder có lỗi sẽ hiển thị Error
   * + Đây là bài toán kinh điển. Ngay cả Android View cũng dùng nó để Refresh màn hình khi có thay đổi
   * + Bài toán Makefile cũng là bài toán kinh điển về recompile khi có thay đổi.
   */
  public updateNodeStatus() {
    // update các child Nodes trc
    if (this.children) {
      for (let childNode of this.children) {
        childNode.updateNodeStatus();
      }
    }
    // sau đó tổng hợp thông tin các child Nodes và update current Node
    // xem vd về updateNodeError() sẽ hiểu.
  }

  //====================================================================
  /**
   * constructor() ko goi constructor trong nó đc, nhưng dùng Static thì ok
   */
  private static convertData2Node(inode: IExtendNode): ExtendNode {
    let node = new ExtendNode(inode);

    if (inode.children) {
      node.children = [];

      inode.children.forEach((iChildNode) => {
        node.children?.push(ExtendNode.convertData2Node(iChildNode));
      });
    }

    return node;
  }

  public static convertDatas2Nodes(inodes: IExtendNode[]): ExtendNode[] {
    let nodes: ExtendNode[] = [];

    inodes.forEach((inode) => {
      nodes.push(ExtendNode.convertData2Node(inode));
    });

    return nodes;
  }
}

/**
 * tạo interface để check cú pháp Object ở DATA_NODES
 */
export interface IExtendNode {
  /**
   * để hiển thị trên tree view (dùng cho router-link url => HashMap)
   * name unique
   * Lúc lấy dữ liệu từ Server về chỉ có 3 properties này thôi
   */
  name: string;
  data?: any; // data của Node tùy bài toán cụ thể
  children?: IExtendNode[];
  //=============================================================
  //các properties thêm vào cho mục đích giao diện và performance
  /**
   * nếu = true thì sẽ highlight nó và Parent của nó
   */
  isError?: boolean;
  /**
   *
   */
  isFolder?: boolean;
  /**
   * + chỗ này nếu dùng Circular Structure thì sẽ ko dùng đc JSON.stringify() hoặc JSON Pipe
   * + vì thế đổi sang dùng name unique và dùng HashMap để tìm kiếm parent Node
   */
  // parent?: ExtendNode;
  parent?: string; // lấy name unique
}

/**
 * tạo interface để check cú pháp Object ở DATA_NODES
 * dùng Object.assign() để chuyển từ IExtendNode => ExtendNode
 *
 * Thực tế thì dùng thẳng Object.assign(ExtenNode[], DATA_NODES) sẽ ko có check cú pháp
 */
export const DATA_NODES: IExtendNode[] = [
  {
    name: 'Fruit',
    children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{ name: 'Broccoli', isError: true }, { name: 'Brussels sprouts' }],
      },
      {
        name: 'Orange',
        isError: true,
        children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
      },
    ],
  },
];
