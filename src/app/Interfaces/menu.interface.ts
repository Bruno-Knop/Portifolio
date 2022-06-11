export interface MenuInterface {
  id: number;
  title: string;
  router: string;
  icon: string;
  children: MenuInterface[];
};
