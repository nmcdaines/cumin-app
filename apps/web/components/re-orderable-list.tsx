import React, { useCallback } from "react";

interface IListItem<T> {
  moveListItem: any
}

function ListItem<T>(props: IListItem<T>) {

}

function ReOrderableList() {
  const move = useCallback((dragIndex: number, hoverIndex: number) => {

  });
}


ReOrderableList.ListItem = ListItem;

export {
  ReOrderableList,
}
