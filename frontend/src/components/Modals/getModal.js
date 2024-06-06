import AddModal from './AddModal';
import RemoveModal from './RemoveModal';
import RenameModal from './RenameModal';

const modals = {
  adding: AddModal,
  removing: RemoveModal,
  renaming: RenameModal,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (modalName) => modals[modalName];
