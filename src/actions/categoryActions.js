import {
  fetchCategories,
  addCategories,
  deleteCategory,
  updateCategory,
} from '../redux/slices/category';

export const handleAddCategory = (dispatch, formData, page, rowsPerPage) => {
  const data = new FormData();
  data.append('name', formData.name);

  if (formData.image) {
    let fileToUpload = null;
    if (formData.image instanceof FileList && formData.image.length > 0) {
      fileToUpload = formData.image[0];
    } else if (formData.image instanceof File) {
      fileToUpload = formData.image;
    }

    if (fileToUpload) {
      data.append('image', fileToUpload);
    }
  }

  dispatch(addCategories(data))
    .then(() => {
      dispatch(fetchCategories({ page: page + 1, limit: rowsPerPage }));
    })
    .catch((error) => {
      console.error('Error adding category:', error);
    });
};

export const handleUpdateCategory = (dispatch, formData, categoryId, page, rowsPerPage) => {
  const data = new FormData();
  data.append('name', formData.name);

  if (formData.image) {
    let fileToUpload = null;

    if (formData.image instanceof FileList && formData.image.length > 0) {
      fileToUpload = formData.image[0];
    } else if (formData.image instanceof File) {
      fileToUpload = formData.image;
    }

    if (fileToUpload) {
      data.append('image', fileToUpload);
    }
  }

  dispatch(
    updateCategory({
      id: categoryId,
      data,
    }),
  )
    .then(() => {
      dispatch(fetchCategories({ page: page + 1, limit: rowsPerPage }));
    })
    .catch((error) => {
      console.error('Error updating category:', error);
    });
};

export const handleDeleteCategory = (dispatch, categoryId) => {
  dispatch(deleteCategory(categoryId))
    .then(() => {
      console.log('Category deleted successfully');
    })
    .catch((error) => {
      console.error('Delete failed:', error);
    });
};
