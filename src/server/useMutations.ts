import { useMutation, useQueryClient } from "@tanstack/react-query";

import { delProduct, setProduct } from "./admin";

//const queryClient = useQueryClient();

export const useProduct = () => {
  const queryClient = useQueryClient();

  const mutationUser = useMutation({
    mutationFn: setProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
  return mutationUser;
};

export const useDelProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: delProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};

// //favorite
// export const useSetFavorite = () => {
//   const queryClient = useQueryClient();

//   const mutationUser = useMutation({
//     mutationFn: setFavorite,
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["favorite"],
//       });
//     },
//   });
//   return mutationUser;
// };

// // booking

// export const useSetBooking = () => {
//   const queryClient = useQueryClient();
//   const mutationUser = useMutation({
//     mutationFn: setBooking,
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["booking"],
//       });
//     },
//   });
//   return mutationUser;
// };

// //review

// export const useSetReview = () => {
//   const queryClient = useQueryClient();
//   const mutationUser = useMutation({
//     mutationFn: setReview,
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["review"],
//       });
//     },
//   });
//   return mutationUser;
// };
